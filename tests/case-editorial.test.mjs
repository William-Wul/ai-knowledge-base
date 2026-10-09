import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { applyEditorialOverrides, loadCases, EDITORIAL_FIELDS, root } from '../scripts/practice-cases-data.mjs'

const read = file => JSON.parse(readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'))
const curated = read('docs/.vitepress/data/practice-cases.json')
const imported = read('docs/.vitepress/data/practice-cases-imported.json')
const originals = new Map([...imported, ...curated].map(item => [item.slug, item]))
const selection = read('docs/.vitepress/data/practice-cases-selection.json').cases
const editorial = read('docs/.vitepress/data/case-editorial-overrides.json')

test('editorial overlays reject changes to source, author, media and validation state', () => {
  const source = { slug: 'sample', promptOriginal: '原文', creator: '作者', sourceUrl: 'https://example.com', tested: false }
  for (const field of ['slug', 'promptOriginal', 'creator', 'sourceUrl', 'url', 'cover', 'mediaUrl', 'mediaType', 'models', 'tested', '__proto__']) {
    assert.throws(() => applyEditorialOverrides([source], { sample: JSON.parse(`{"${field}":"changed"}`) }), /禁止修改/)
  }
  assert.throws(() => applyEditorialOverrides([source], { missing: { lesson: '新练习' } }), /缺少来源/)
  assert.throws(() => applyEditorialOverrides([source], { sample: { steps: ['一步'] } }), /步骤无效/)
  assert.throws(() => applyEditorialOverrides([source], { sample: { exercise: '' } }), /为空/)
  const before = JSON.stringify(source)
  const result = applyEditorialOverrides([source], { sample: { lesson: '本站教学', exercise: '本站练习' } })
  assert.equal(result[0].lesson, '本站教学')
  assert.equal(JSON.stringify(source), before, 'editorial read must not write into source data')
  assert.notEqual(result[0], source)
})

test('the selected catalog retains every source field and prompt fingerprint after editing', () => {
  const cases = loadCases()
  assert.equal(cases.length, selection.length)
  assert.ok(selection.length > 0)
  assert.deepEqual(cases.map(item => item.slug), selection.map(item => item.slug))
  for (const item of cases) {
    const source = originals.get(item.slug)
    assert.ok(source, item.slug)
    for (const [field, value] of Object.entries(source)) {
      if (!EDITORIAL_FIELDS.has(field)) assert.deepEqual(item[field], value, `${item.slug}/${field}`)
    }
    const expected = selection.find(entry => entry.slug === item.slug).sourcePromptSha256
    assert.equal(createHash('sha256').update(item.promptOriginal).digest('hex'), expected, item.slug)
  }
})

test('representative exercises are persisted as editorial overlays with source gaps identified', () => {
  const slugs = ['case-70c0c26586c3', '2d-animation-sprite-sheet-generator', 'youmind-character-identity-reference-chart', 'batch-product-poster-proposal-generator', 'real-case-07-techiebysa', 'minimax-h3-15-ae2cadd5c3f4', 'seedance-25-kpop-mv-dual-idol', 'youralphamom-seedance-ai-9afbf3248f50', '404-planet', 'lumi-fcc36eede4ad', 'lovable-1ab5b549beb5', 'nike-hover', 'zyrellix-seedance-ai-cd1e800467b5']
  for (const slug of slugs) {
    assert.ok(editorial[slug].steps.length >= 4, slug)
    assert.ok(editorial[slug].preparation && editorial[slug].lesson && editorial[slug].exercise, slug)
  }
  const bySlug = new Map(loadCases().map(item => [item.slug, item]))
  const croissant = bySlug.get('real-case-07-techiebysa')
  assert.ok(croissant.promptZh.includes('重点特写'))
  assert.doesNotMatch(croissant.promptZh, /英雄镜头|英雄特写|首屏镜头/)
  assert.match(croissant.preparation, /12 秒/)
  assert.match(croissant.steps.join(' '), /声音|音轨/)
  assert.match(croissant.exercise, /本站/)
  assert.match(bySlug.get('seedance-25-kpop-mv-dual-idol').steps.join(' '), /29 秒/)
  assert.match(bySlug.get('lumi-fcc36eede4ad').steps.join(' '), /1083\.33/)
  assert.match(bySlug.get('lovable-1ab5b549beb5').preparation, /未说明已在每种邮件客户端验证/)
  const fragrance = bySlug.get('zyrellix-seedance-ai-cd1e800467b5')
  assert.match(fragrance.preparation, /没有规定总时长、各镜时长、音乐或音效/)
  assert.match(fragrance.preparation, /作者的画面要求/)
  assert.match(fragrance.preparation, /工具实际可选设置和输出为准/)
  assert.match(fragrance.translationNote, /原文没有指定时长、音乐或音效/)
  assert.match(fragrance.promptZh, /8K 分辨率/)
  assert.match(fragrance.promptZh, /60fps/)
  assert.match(fragrance.promptZh, /产品重点特写/)
  assert.doesNotMatch(fragrance.promptZh, /首屏|\bshot\b|cinematic|hyper-realistic|lens flare/)
  assert.match(fragrance.lesson, /原文没有用时间段或声音/)
})

test('video hero shot translation is contextual and preserves source code and dialogue', () => {
  const code = String.raw`from case_terminology import normalize_terms
assert normalize_terms('hero shot 与 hero', 'video') == '重点特写 与 hero'
assert normalize_terms('hero shot', 'web') != '重点特写'
protected = '\x60hero shot\x60 https://example.com/hero "hero shot" @[hero shot]'
assert normalize_terms(protected, 'video') == protected
print('contextual terminology passed')`
  const output = execFileSync('python3', ['-c', code], { cwd: `${root}/scripts`, env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }, encoding: 'utf8' })
  assert.match(output, /passed/)
})

test('import prose normalization protects quoted screen text and executes without data import side effects', () => {
  const code = String.raw`import ast, re
from pathlib import Path
tree = ast.parse(Path('import-practice-cases.py').read_text())
names = {'glossary', 'pattern'}
nodes = [node for node in tree.body if
    isinstance(node, ast.Assign) and any(isinstance(target, ast.Name) and target.id in names for target in node.targets)
    or isinstance(node, ast.FunctionDef) and node.name == 'zh_prose']
namespace = {'re': re}
exec(compile(ast.Module(body=nodes, type_ignores=[]), '<isolated-import-normalizer>', 'exec'), namespace)
normalize = namespace['zh_prose']
protected = ['"hero button"', '“hero shot”', '@[hero shot]', '\x60hero button\x60', '\x60\x60\x60js\nconst label = "hero button"; // hero shot\n\x60\x60\x60', 'https://example.com/hero/button', '{argument name=hero button}']
for fragment in protected:
    text = '中文提示旁' + fragment + '结束'
    assert normalize(text, 'video') == text, fragment
    assert normalize(text, 'web') == text, fragment
assert normalize('中文提示：hero shot', 'video') == '中文提示：重点特写'
print('isolated import prose protection passed')`
  const output = execFileSync('python3', ['-c', code], { cwd: `${root}/scripts`, env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' }, encoding: 'utf8' })
  assert.match(output, /protection passed/)
})
