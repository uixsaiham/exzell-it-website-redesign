#!/usr/bin/env bash
# Builds the static export and commits it to the gh-pages branch that GitHub Pages serves.
set -euo pipefail
cd "$(dirname "$0")/.."

# Static export can't include the POST contact route, so park it outside app/ during the build.
stash="$(mktemp -d)"
mv app/api "$stash/api"
trap 'mv "$stash/api" app/api' EXIT

rm -rf out
GITHUB_PAGES=true npx next build
touch out/.nojekyll

# Check out gh-pages (or start it) in a temporary worktree and replace its contents with the new build.
site="$(mktemp -d)/gh-pages"
if git fetch -q origin gh-pages 2>/dev/null; then
  git worktree add -q -B gh-pages "$site" FETCH_HEAD
else
  git worktree add -q --detach "$site" && git -C "$site" switch -q --orphan gh-pages
fi
git -C "$site" rm -rq --ignore-unmatch .
cp -R out/. "$site"
git -C "$site" add -A
git -C "$site" commit -q -m "Deploy $(git rev-parse --short HEAD)" || echo "No changes to deploy"
git -C "$site" push -q origin gh-pages
git worktree remove --force "$site"
echo "Deployed to https://uixsaiham.github.io/exzell-it-website-redesign/"
