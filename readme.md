```
ζ yarn ts-node src/test.ts
yarn run v1.22.17
$ /Users/juliamerz/hack/solstory-other/bundlr-test/node_modules/.bin/ts-node src/test.ts
bundlr price, balance 1034 0
attempting to increase funding by 1138
Error: HTTP Error: Posting transaction 5rZGjBA6po6AH45DdLxuD84YLcs5hQqCZLqK3vFrYjnJpugRC9evdsPLpRztPWXrTZJETYauTGJ78Qh4sWopS6eY information to the bundler: 400 Invalid tx
    at Function.checkAndThrow (/Users/juliamerz/hack/solstory-other/bundlr-test/node_modules/@bundlr-network/client/src/common/utils.ts:27:19)
    at Fund.fund (/Users/juliamerz/hack/solstory-other/bundlr-test/node_modules/@bundlr-network/client/src/common/fund.ts:48:15)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
