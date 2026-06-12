#!/usr/bin/env bash
#
# Generator matrix shared by run-static.sh and run-crud.sh.
# Sourced — never run directly.
#
# Mirrors test/generators/_matrix.sh in the sister nestjs-boilerplate repo,
# but uses the frontend's flag set (--referenceType toOne|toMany,
# --propertyForSelect, --isShowInTable). Only properties with
# isAddToDto=true on the backend get a frontend field at all, so we generate
# exactly those.

run_matrix() {
  npm run generate:resource -- --name Tag
  npm run generate:resource -- --name BlogComment
  npm run generate:resource -- --name Article

  npm run generate:field -- --name Tag         --property name --kind primitive --type string --isOptional false --isShowInTable true
  npm run generate:field -- --name BlogComment --property text --kind primitive --type string --isOptional false --isShowInTable true

  npm run generate:field -- --name Article --property title       --kind primitive --type string  --isOptional false --isShowInTable true
  npm run generate:field -- --name Article --property subtitle    --kind primitive --type string  --isOptional true  --isShowInTable false
  npm run generate:field -- --name Article --property views       --kind primitive --type number  --isOptional false --isShowInTable true
  npm run generate:field -- --name Article --property isPublished --kind primitive --type boolean --isOptional false --isShowInTable true
  npm run generate:field -- --name Article --property publishedAt --kind primitive --type Date    --isOptional true  --isShowInTable false

  npm run generate:field -- --name Article --property coverImage --kind reference    --type File --referenceType toOne                              --isOptional true  --isShowInTable false
  npm run generate:field -- --name Article --property author     --kind reference    --type User --referenceType toOne --propertyForSelect email   --isOptional false --isShowInTable true
  npm run generate:field -- --name Article --property tags       --kind reference    --type Tag  --referenceType toMany --propertyForSelect name   --isOptional true  --isShowInTable false

  npm run generate:field -- --name Article --property denormalizedAuthor --kind denormalized --type User --referenceType toOne --propertyForSelect email --isOptional false --isShowInTable false
}
