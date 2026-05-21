# sesh

Auto-name Claude Code sessions based on conversation context.

## How it works

After 3 user messages, a `UserPromptSubmit` hook injects a one-time instruction that asks Claude to generate a concise session name and set it via `claude session name`. Runs silently. No interruption to the workflow.

## Install

```
/plugin marketplace add ibrahemid/plugins
/plugin install sesh@ibrahemid
```

## License

MIT
