---
name: remove-commit-slop
description: Remove commit slop by reviewing long-term usefulness and AI discoverability in files intended for a commit.
disable-model-invocation: true
---

Review every file that will be committed. For each file, ask whether its contents will remain useful to the project over the next five years. Delete any content for which the answer is no.

For content where the answer is yes, assess whether an AI agent can easily find it. If it cannot, adjust the content so that it is easy to find.
