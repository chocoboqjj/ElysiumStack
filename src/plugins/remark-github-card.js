import { visit } from "unist-util-visit";

/**
 * remark 插件：将 `::github{repo="owner/repo"}` 文本重建为正确的 leaf directive 节点。
 *
 * 背景：当前依赖链中的 micromark-extension-directive@4.0.0 无法正确解析
 * `key="value"` 形式的指令属性（等号被当作属性名的一部分、引号会提前终止属性名），
 * 导致 `::github{repo="..."}` 整段被降级为普通段落文本，GitHub 卡片无法渲染。
 * 该插件在 remark-directive 之后介入，仅针对 github 指令用独立解析器重建节点，
 * 其余指令（提醒块等）不受影响。
 *
 * @returns {(tree: import('mdast').Root) => void}
 */
export function remarkGithubCard() {
	return (tree) => {
		visit(tree, "paragraph", (node, index, parent) => {
			if (!parent || index == null) return;
			// 只处理「单个文本节点」的段落
			if (node.children.length !== 1 || node.children[0].type !== "text") return;

			const text = node.children[0].value.trim();
			// 匹配 ::github{ ... }（严格两冒号 leaf 指令）
			const m = text.match(/^::github\{(.+)\}$/);
			if (!m) return;

			const attributes = parseAttributes(m[1]);
			if (!attributes.repo) return;

			/** @type {import('mdast').LeafDirective} */
			const directive = {
				type: "leafDirective",
				name: "github",
				attributes,
				children: [],
				data: {
					hName: "github",
					hProperties: attributes,
				},
			};

			parent.children.splice(index, 1, directive);
			return [visit.SKIP, index];
		});
	};
}

/**
 * 解析指令属性字符串，支持 `key="value"` / `key='value'` / `key=value` 三种写法。
 * @param {string} raw
 * @returns {Record<string, string>}
 */
function parseAttributes(raw) {
	// 将中文输入法产生的弯引号（“”‘’）归一化为 ASCII 直引号，
	// 避免把整对弯引号误当成属性值的一部分。
	const normalized = raw.replace(/[“”‘’]/g, '"');
	const result = {};
	const re = /([\w-]+)\s*=\s*("([^"]*)"|'([^']*)'|(\S+))/g;
	let m;
	while ((m = re.exec(normalized)) !== null) {
		const key = m[1];
		const value = m[3] ?? m[4] ?? m[5];
		if (value !== undefined) result[key] = value;
	}
	return result;
}
