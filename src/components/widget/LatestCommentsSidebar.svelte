<script lang="ts">
	import { onMount } from "svelte";
	import I18nKey from "@i18n/i18nKey";
	import { i18n } from "@i18n/translation";

	interface RecentComment {
		id: string;
		url: string;
		nick: string;
		mail: string;
		link: string;
		comment: string;
		created: number;
		avatar: string;
	}

	interface Props {
		commentType: string;
		envId: string;
		jsUrl: string;
		limit: number;
	}
	let { commentType, envId, jsUrl, limit }: Props = $props();

	let comments = $state<RecentComment[]>([]);
	let loading = $state(true);
	let error = $state(false);

	function stripHtml(input: string): string {
		const div = document.createElement("div");
		div.innerHTML = input;
		return div.textContent || "";
	}

	function normalizeUrl(u: string): string {
		if (!u) return "/";
		// 确保以 / 开头
		let p = u.startsWith("/") ? u : "/" + u;
		// 本站 trailingSlash: "always"，Twikoo 存储的 url 已去除尾斜杠，这里补回（根路径除外）
		if (p.length > 1 && !p.endsWith("/")) p += "/";
		return p;
	}

	function timeAgo(ts: number): string {
		const sec = Math.floor((Date.now() - ts) / 1000);
		if (sec < 60) return "刚刚";
		const min = Math.floor(sec / 60);
		if (min < 60) return `${min} 分钟前`;
		const hr = Math.floor(min / 60);
		if (hr < 24) return `${hr} 小时前`;
		const day = Math.floor(hr / 24);
		if (day < 30) return `${day} 天前`;
		const d = new Date(ts);
		const mm = String(d.getMonth() + 1).padStart(2, "0");
		const dd = String(d.getDate()).padStart(2, "0");
		return `${d.getFullYear()}-${mm}-${dd}`;
	}

	function loadScript(src: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const w = window as unknown as { twikoo?: unknown };
			if (w.twikoo) return resolve();
			if (document.querySelector(`script[data-lc-src="${src}"]`)) return resolve();
			const s = document.createElement("script");
			s.src = src;
			s.dataset.lcSrc = src;
			s.onload = () => resolve();
			s.onerror = () => reject(new Error("Failed to load " + src));
			document.head.appendChild(s);
		});
	}

	onMount(async () => {
		if (commentType !== "twikoo") {
			loading = false;
			return;
		}
		try {
			await loadScript(jsUrl);
			const twikoo = (window as unknown as {
				twikoo: { getRecentComments: (o: Record<string, unknown>) => Promise<RecentComment[]> };
			}).twikoo;
			comments = await twikoo.getRecentComments({
				envId,
				pageSize: limit,
				includeReply: false,
			});
		} catch {
			error = true;
		} finally {
			loading = false;
		}
	});
</script>

<div class="flex flex-col gap-1.5">
	{#if loading}
		<div class="flex justify-center p-3">
			<svg class="size-5 animate-spin text-(--primary)" viewBox="0 0 24 24" fill="none">
				<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25" />
				<path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
			</svg>
		</div>
	{:else if commentType !== "twikoo"}
		<p class="m-0 p-3 text-center text-sm text-neutral-500">
			{i18n(I18nKey.latestCommentsNotSupported)}
		</p>
	{:else if error}
		<p class="m-0 p-3 text-center text-sm text-neutral-500">
			{i18n(I18nKey.latestCommentsError)}
		</p>
	{:else if comments.length === 0}
		<p class="m-0 p-3 text-center text-sm text-neutral-500">
			{i18n(I18nKey.latestCommentsEmpty)}
		</p>
	{:else}
		{#each comments as c (c.id)}
			{@const text = stripHtml(c.comment)}
			{@const nick = stripHtml(c.nick || "匿名")}
			<a
				href={`${normalizeUrl(c.url)}#${c.id}`}
				class="group flex h-20 min-w-0 items-start gap-3 overflow-hidden rounded-lg p-2
					text-neutral-700/75 dark:text-neutral-300/75
					hover:bg-(--btn-plain-bg-hover) hover:text-(--primary)
					active:bg-(--btn-plain-bg-active) transition-colors duration-150"
			>
				{#if c.avatar}
					<img
						src={c.avatar}
						alt=""
						loading="lazy"
						decoding="async"
						class="size-10 shrink-0 rounded-full bg-(--btn-plain-bg-hover) object-cover"
					/>
				{:else}
					<div class="size-10 shrink-0 rounded-full bg-(--btn-plain-bg-hover)"></div>
				{/if}
				<div class="min-w-0 flex-1">
					<div class="mb-0.5 flex items-center gap-1 text-xs leading-4 text-(--primary)">
						<span class="truncate font-medium text-(--btn-content) group-hover:text-(--primary)">
							{nick}
						</span>
						<time class="ml-auto flex-shrink-0 opacity-75">{timeAgo(c.created)}</time>
					</div>
					<p class="m-0 line-clamp-2 text-sm leading-[1.35rem]">{text}</p>
				</div>
			</a>
		{/each}
	{/if}
</div>
