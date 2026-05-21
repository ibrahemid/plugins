# plugins

Workspace for Claude Code plugins. Each plugin lives under `plugins/<name>/` and is published via the top-level `.claude-plugin/marketplace.json` (marketplace name: `ibrahemid`).

## Layout

```
plugins/
  to-html/
  sesh/
.claude-plugin/marketplace.json
.claude/settings.json
docs/PLUGIN_PATTERNS.md
```

## Adding a plugin

1. Create `plugins/<name>/` with:
   ```
   .claude-plugin/plugin.json
   commands/ | hooks/ | skills/ | agents/   (as needed)
   README.md
   ```
2. Register it in `.claude-plugin/marketplace.json` under `plugins[]`.
3. Validate with the `plugin-dev:plugin-validator` agent.
4. Test locally: `/plugin install <name>@ibrahemid`.

## Conventions

- No code comments. Code self-documents. Comment only non-obvious workarounds or invariants.
- TypeScript strict mode. No `any`. No placeholder code.
- Custom error classes with descriptive messages, not generic `Error()`.
- Naming: verb+noun functions, is/has/should booleans, SCREAMING_SNAKE_CASE constants.
- Slash command names use kebab-case (`to-html`, not `toHtml`).
- Skill names match their directory name.
- Plugin manifests (`plugin.json`) are the contract. Keep `name`, `version`, `description` accurate.
- Hooks placed under each plugin's `hooks/` dir and referenced via `${CLAUDE_PLUGIN_ROOT}`.

## Quality gates before commit

1. `plugin-dev:plugin-validator` passes for changed plugins.
2. Skill descriptions reviewed (third-person, concrete trigger phrases).
3. Command frontmatter (`description`, `argument-hint`) accurate.
4. Install + invoke happy path in a real CC session at least once.

## Not in scope here

- Top-level build. Each plugin builds itself.
- Shared dependencies. No root `package.json`, no root `node_modules`.
- Replacing per-plugin CLAUDE.md or README.md.
