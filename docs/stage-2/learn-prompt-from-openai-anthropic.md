---
title: 跟 OpenAI 和 Anthropic 学写提示词
description: 两家公司给自己 AI 写的系统提示词先后被公开，官方提示词指南也在手边。从这批一手材料里，提炼六条普通用户能直接抄的写法。
---

# 跟 OpenAI 和 Anthropic 学写提示词

2026 年 9 月，一个第三方 GitHub 仓库先后公开了两份文件：OpenAI 桌面助手 Codex 用的系统提示词，5051 行；Claude Opus 5 在官网聊天里用的系统提示词，2049 行。两份都是第三方从技术渠道提取的版本，不是厂商主动公开的，但行数和内容都可以在仓库里直接核对。

先解释什么是**系统提示词**。它是厂商写给自家模型的一份全局指令，用户平时看不见：你每次打开对话框，模型在回答你之前，已经先把这份文件读过一遍。它相当于公司发给新员工的入职手册加岗位说明书，写清楚"你是谁、怎么说话、什么事能做、什么事必须先请示"。我们日常写的提示词只管一次对话，系统提示词管的是这个 AI 的所有对话。

![GitHub 仓库里的 GPT-6 Astra 提示词文件](/images/stage-2/2026-09-15/cl4r1t4s-repo-astra.png)
<div class="figcaption">公开仓库 OPENAI / Codex_Desktop 目录下的 GPT-6_Astra_Prompts.md，9 月上旬刚刚更新过。这份文件就是全文 5051 行的 Astra 系统提示词。（图源：[GitHub CL4R1T4S 仓库](https://github.com/elder-plinius/CL4R1T4S)）</div>

![GitHub 仓库里的 Claude Opus 5 提示词文件](/images/stage-2/2026-09-15/cl4r1t4s-repo-opus5.png)
<div class="figcaption">同一个仓库里的 OPUS-5.md，页面上直接标着"2049 lines"。（图源：[GitHub CL4R1T4S 仓库](https://github.com/elder-plinius/CL4R1T4S)）</div>

这种文件是厂商内部反复打磨、逐句测试过的，说是全世界写得最认真的提示词不为过。有意思的是，两家的写法风格完全不同：

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f6faf7;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">OpenAI · 5051 行，一箱零件</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">不是一整篇文章，是几十个可按场景拼装的模块：身份卡、权限规则、写作风格、记忆指令、安全审查，各管一段。<br><span style="color:#2D5A3D; font-weight:600;">身份设定只有一句："你是 Codex，一个基于 GPT-6 的智能体。"</span></div>
  </div>
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f6faf7;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">Anthropic · 2049 行，一整块独白</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">一口气写完的连贯文件，光"记忆"一件事就占了约 800 行，细到"年龄可以存，年龄加生日不能同时存"。<br><span style="color:#2D5A3D; font-weight:600;">每多一种能力，就多写一段防错规则。</span></div>
  </div>
</div>
<p class="figcaption">写法完全不同，但被反复打磨的程度一样，都是逐句抠出来的。</p>

再加上两家公司各自公开的官方提示词指南，普通人能拿到的一手"标准答案"就齐了。下面是从这批材料里提炼的六条写法，每条都能直接抄进我们的日常用法。

---

## 一、说"要做什么"，少说"不做什么"

Anthropic 官方提示词文档里有一条原则：告诉模型该做什么，比告诉它别做什么更有效。

原因很实在。"不要用 X"这种写法，模型得先理解 X 是什么、再压住自己不去做，绕了一个弯；直接给它一条能走的正路，它抬脚就走。这跟带新人一个道理：你跟他说"别紧张"，他只会更紧张；你说"深呼吸，从第一步开始"，他就知道该干嘛了。

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#faf3f3; padding:11px 14px; border-bottom:1px solid #eee; font-size:14px;">
    <div style="flex:1; color:#9a4a4a; font-weight:700;">❌ 否定式（绕弯）</div>
    <div style="flex:1; color:#9a4a4a;">"不要用 markdown 格式。"<br>"别写得太长。"</div>
  </div>
  <div style="display:flex; background:#f1f6f2; padding:11px 14px; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:700;">✅ 正面式（给正路）</div>
    <div style="flex:1; color:#33503c;">"用连贯的段落回答，别分点。"<br>"控制在 200 字以内。"</div>
  </div>
</div>
<p class="figcaption">同一个要求，正面说法是直接给路，否定说法是让模型自己猜路。</p>

自查方法：把自己常用的提示词翻出来，数数里面有几个"别""不要""禁止"。除了安全红线（比如"绝不许把文件外发"）保留否定式，其他的都试着换成正面说法。

---

## 二、角色一句话就够，重点写"怎么协作"

以前流行的写法是给 AI 堆一大段角色背景："你是世界顶级数据分析师，拥有 20 年经验，服务过 500 强……"OpenAI 官方指南的建议反过来了：角色一到两句话说清功能就够，省下的篇幅用来写"人设"，也就是它该怎么跟你协作。

OpenAI 自己的手册就是这么干的。5051 行里，身份设定只有一句话："你是 Codex，一个基于 GPT-6 的智能体。"剩下的篇幅全花在行为规则上。

人设管的不是"它是谁"，是"它怎么干活"：拿不准的时候，是自己拍板继续，还是停下来问你。OpenAI 官方指南给过两种现成的人设模板：

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:1px solid #dde7e0; border-radius:12px; padding:16px; background:#fbfcfb;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">稳重型</div>
    <div style="font-size:14px; line-height:1.9; color:#444;">"你是一个靠谱的协作者，沉稳、直接。假设用户有能力且出发点是好的。能往前推进就别停下来问。"</div>
  </div>
  <div style="flex:1; min-width:240px; border:1px solid #dde7e0; border-radius:12px; padding:16px; background:#fbfcfb;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">表达型</div>
    <div style="font-size:14px; line-height:1.9; color:#444;">"采用鲜明的对话风格，聪明、好奇、适当俏皮。模糊的问题要多问，上下文够了就果断给建议。"</div>
  </div>
</div>
<p class="figcaption">注意两个模板都没说"它是谁"，通篇只在规定它"怎么跟你相处"。</p>

我们的用法：在自定义指令或者每次派活时，角色写一行，协作方式写两三行。比如"能往前推进就别停下来问，只有不可逆的操作才找我确认"，这一句对结果的影响，比十行角色背景大得多。

---

## 三、把批准放在最后一步

OpenAI 手册里有一条产品哲学，原话的意思是：先把已经授权的活全部干完，做成一个能审查的成品，最后才让用户点头。**用户批准的是成品，不是计划**。

![GPT-6 Astra 系统提示词的权限段落](/images/stage-2/2026-09-15/astra-base-template.png)
<div class="figcaption">Astra 手册开头的权限段落：像靠谱同事一样判断，证据够了就继续干；"用户批准的是一个具体、可审查的结果"。顶部第一行就是那句唯一的身份设定。（图源：[GitHub CL4R1T4S 仓库](https://github.com/elder-plinius/CL4R1T4S)）</div>

这条的官方依据也公开了。GPT-6 Astra 发布后，很多用户抱怨它太磨叽，干两分钟就停下来问"要不要我继续"。官方指南承认这种谨慎是设计出来的，并直接给了一段提示词解法：

![OpenAI 官方指南的主动性提示词](/images/stage-2/2026-09-15/official-initiative-prompt.png)
<div class="figcaption">官方指南"主动性和执行力"一节给出的提示词模板：从指令里推断意图，朝着行动倾斜，把任务坚持做完，除非操作明显具有破坏性、不可逆。（图源：[OpenAI 官方指南](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra)）</div>

对应到我们的日常：很多人派活时习惯说"先给我列个大纲看看"。如果不是大项目，试试直接说"一口气写完发我，我在成品上提意见"。省一轮来回不说，在成品上提意见，远比对着大纲想象成品要准。真正需要它停下来先问的，只有不可逆动作：发出去、删掉、付款、覆盖原文件。

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:2px solid #d9c4c4; border-radius:12px; padding:18px; background:#faf3f3;">
    <div style="font-weight:700; color:#9a4a4a; margin-bottom:8px;">老习惯：逐步请示</div>
    <div style="font-size:14px; line-height:1.9; color:#5a4040;">"先给我列个大纲" → 你确认 → "写完第一节给我看看" → 你确认 → 继续写<br><span style="color:#9a4a4a; font-weight:600;">每一步都停下来等你，半天过去还在第一节。</span></div>
  </div>
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">官方思路：成品报批</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">"直接写完一整篇发我，我在成品上提意见。只有要发出去之前再问我一次。"<br><span style="color:#2D5A3D; font-weight:600;">一轮来回拿到完整成品，意见改在实物上。</span></div>
  </div>
</div>
<p class="figcaption">把"批准"从过程中的每一步，挪到最后一步。</p>

---

## 四、写清停止条件

只交代任务、不交代什么时候算完，AI 可能一直干下去：查资料的会一直搜，改稿的会一遍遍推倒重来。钱花了不少，结果还跑题。

OpenAI 官方指南专门讲了这个问题，建议在提示词里写清停止条件。查资料类任务，官方推荐的写法大意是：先搜一轮，结果能支撑回答就直接答；只有三种情况值得搜第二轮（第一轮没答案、缺关键数据、你明确要求全面覆盖）。多步任务同理，让它每完成一步问自己一句"现在能回答了吗，能就停"。

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">可以直接抄的三句"停止条件"</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444;"><b>查资料：</b>"先搜一轮，结果够回答就直接答。只有第一轮没答案、缺关键数据，或者我明确要求全面覆盖时，才搜第二轮。"</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444; background:#fafcfb;"><b>改稿：</b>"改完一遍，自己通读检查一遍就交给我，不要推倒重来。"</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444;"><b>长任务：</b>"每完成一步问自己：现在能交付了吗？能就停下来交。"</div>
</div>
<p class="figcaption">"到什么程度算完"这句话，就是停止条件，也是省钱开关。</p>

---

## 五、规矩多了，要写清"冲突时听谁的"

新模型对规则特别较真，这是 OpenAI 官方自己承认的烦恼：你给它的规矩文件里如果有两条规则互相矛盾，它不会自己挑一条执行，而是卡住，或者两条都想满足、结果两边都做不到。

官方的解法有三条：定期审计规则文件、删掉过期的；写明指令优先级；让它卡住时自己交代"是哪份文件哪条规则让我停下的"。其中一句值得划线：**过期的说明比没有说明更危险**，因为新模型会把旧规矩当高优先级指令认真执行。

这些不只对写代码的人有用。我们在 AI 应用里攒的自定义指令、它记下的关于我们的记忆、收藏夹里的旧提示词，就是普通用户版的"规矩文件"。对应的三个动作：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">给 AI 的每条长期规矩，过一遍这三个问题</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444;"><b>这条规矩是所有任务通用，还是只针对某个场景？</b>只管某个场景的，改成"当……时才这样做"的触发式写法，别让它全天候生效。</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444; background:#fafcfb;"><b>这件事 AI 本来就会做吗？</b>会就删掉。比如"回答前先想清楚"，现在的模型不需要这种叮嘱，写了反而占地方。</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444;"><b>没有这条规矩，最坏的结果能接受吗？</b>能就把"必须"改成"可以"，把强制改成授权，规矩越少越硬。</div>
</div>
<p class="figcaption">官方检查清单的普通用户版：规矩文件要定期清理，过期的赶紧删。</p>

另外值得抄一句兜底条款进自己的长期指令："**我的当场要求和之前说过的规矩冲突时，以当场要求为准。**"这一句能解掉大多数规则打架。

---

## 六、"AI 八股词"，两家官方都在拉黑

"值得注意的是""总而言之""让我们一起深入探讨"，这类 AI 腔套话有个专门的名字，叫 slop words（AI 八股词），指 AI 写作里高频出现的套路词句。OpenAI 直接把一份黑名单写进了系统提示词：点名禁用 delve、foster、leverage、"it's worth noting"，以及"这不是 X，而是 Y"的对比句式。还有一条更有意思：不许自夸，不能靠贬低一个根本没发生过的烂方案来抬升自己的方案。

![GPT-6 Astra 系统提示词的写作风格段落](/images/stage-2/2026-09-15/astra-slop-words.png)
<div class="figcaption">Astra 手册的写作风格段落："Avoid using AI slop words"后面跟着一整串禁用词和禁用句式。去 AI 味这件事，厂商自己在第一线跟它较劲。（图源：[GitHub CL4R1T4S 仓库](https://github.com/elder-plinius/CL4R1T4S)）</div>

官方指南同步给出了可直接复制的禁令模板。我们抄的时候换成中文版就行：

<div style="border:1px solid #dde7e0; border-radius:12px; padding:16px; margin:18px 0; background:#f6faf7;">
  <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">可以直接抄的中文版黑名单</div>
  <div style="font-size:14px; line-height:1.9; color:#33503c;">"不要用'值得注意的是''总而言之''在当今时代'这类套话；不要用'不是 X 而是 Y'的对比句式；不要自夸，不要靠说'别人会怎么做砸'来显得自己做得好。"</div>
</div>
<p class="figcaption">把这段话贴进写作类任务的指令里，AI 味能去掉一大半。</p>

---

## 小结

六条来自同一个趋势：**模型越强，提示词里"怎么做"说得越少，"做到什么程度算完成"说得越多**。

两家公司写手册的方式不一样，一个攒了一箱按场景拼装的零件，一个写了一整块两千行的独白，但抠的东西高度一致：话说明白、边界划清、冲突有解、完成有标准。这也是我们写提示词时可以对照的四个方向。

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">写完一段提示词，自查这六条</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444;"><b>1. 正面说。</b>"别""不要"除了安全红线，都换成了"要做什么"吗？</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444; background:#fafcfb;"><b>2. 角色从简。</b>角色背景控制在一两句，省下的字数写给协作方式了吗？</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444;"><b>3. 成品报批。</b>说清"直接做完再给我看"了吗，还是又让它逐步请示？</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444; background:#fafcfb;"><b>4. 有停止条件。</b>"到什么程度算完"写了吗？</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444;"><b>5. 冲突有解。</b>长期规矩定期清理了吗，兜底条款（当场要求优先）写了吗？</div>
  <div style="padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; color:#444; background:#fafcfb;"><b>6. 拉黑套话。</b>写作类任务，黑名单贴了吗？</div>
</div>
<p class="figcaption">六条记不住没关系，这张表存在收藏夹里，写提示词时对着勾一遍就行。</p>

## 扩展阅读

- [《GPT-6 Astra 系统提示词泄露，里面竟还藏了个保安》](https://mp.weixin.qq.com/s/frqq9oXXoR28IERGkBR1xg) · **cxuanAI**（微信公众号）
- [《Claude Opus 5 的系统提示词也被扒了，真会玩儿啊。》](https://mp.weixin.qq.com/s/1HjpOqpOMNwD_Sq0s9IoXw) · **cxuanAI**（微信公众号）
- [《连夜拆解 GPT-6 Astra 官方指南，这 6 条黄金法则建议直接抄！》](https://mp.weixin.qq.com/s/OdgoBn9y17DGJYriok55TQ) · **AI信息Gap**（微信公众号）
- [Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) · **OpenAI 官方博客**
- [Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) · **Anthropic 官方文档**
