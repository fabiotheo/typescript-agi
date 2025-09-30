# NPM Package Management Guide

## Publishing Beta Versions

Beta versions allow you to test changes in production before releasing an official version.

### 1. Create and Publish Beta Version

```bash
# Update version to beta (e.g., 0.0.8-beta.1)
npm version 0.0.8-beta.1 --no-git-tag-version

# Build the project
npm run build

# Publish with beta tag
npm publish --tag beta

# Verify beta was published
npm view typescript-agi-ipcom@beta
```

### 2. Install Beta Version in Your Project

```bash
# Install specific beta version
npm install typescript-agi-ipcom@0.0.8-beta.1

# Or install latest beta
npm install typescript-agi-ipcom@beta
```

### 3. Publish Additional Beta Versions (if needed)

```bash
# Increment beta version
npm version 0.0.8-beta.2 --no-git-tag-version
npm run build
npm publish --tag beta
```

## Publishing Official Release

Once beta testing is complete, publish the official version.

### 1. Update to Official Version

```bash
# Remove -beta suffix (e.g., 0.0.8-beta.8 -> 0.0.8)
npm version 0.0.8 --no-git-tag-version

# Build the project
npm run build
```

### 2. Publish Official Version

```bash
# Publish to npm with 'latest' tag (default)
npm publish

# Verify it was published correctly
npm view typescript-agi-ipcom
npm view typescript-agi-ipcom dist-tags
```

The output should show:
```
dist-tags:
  latest: 0.0.8
  beta: 0.0.8-beta.8
```

### 3. Update Beta Tag (Optional)

If you want the beta tag to also point to the latest official version:

```bash
npm dist-tag add typescript-agi-ipcom@0.0.8 beta
```

## Version Numbering

Follow semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes, backwards compatible

### Beta Version Format

```
MAJOR.MINOR.PATCH-beta.NUMBER
```

Examples:
- `0.0.8-beta.1` - First beta for version 0.0.8
- `0.0.8-beta.2` - Second beta for version 0.0.8
- `1.0.0-beta.1` - First beta for version 1.0.0

## Common Commands

```bash
# View all published versions
npm view typescript-agi-ipcom versions

# View distribution tags
npm view typescript-agi-ipcom dist-tags

# View package info
npm view typescript-agi-ipcom

# Check who owns the package
npm owner ls typescript-agi-ipcom

# Unpublish a version (within 72 hours)
npm unpublish typescript-agi-ipcom@0.0.8-beta.1
```

## Troubleshooting

### Wrong package name
If you get permission errors, make sure you're publishing to the correct package:
```bash
# Check package.json name field
grep "name" package.json

# Verify you own the package
npm owner ls typescript-agi-ipcom
```

### Both latest and beta pointing to beta version
This happens if you publish beta without the `--tag beta` flag:

```bash
# Fix by adding correct tags
npm dist-tag add typescript-agi-ipcom@0.0.8 latest
npm dist-tag add typescript-agi-ipcom@0.0.8-beta.8 beta
```

### Forgotten to build
Always run `npm run build` before publishing:
```bash
npm run build
npm publish
```

## Best Practices

1. **Always test beta versions** in production before official release
2. **Build before publishing** to ensure latest code is included
3. **Use `--no-git-tag-version`** to prevent automatic git tags when bumping version
4. **Document changes** in changelog before official release
5. **Commit after publishing** to save version changes to git

## Git Workflow

```bash
# After publishing official version, commit the changes
git add package.json package-lock.yaml
git commit -m "Release version 0.0.8"
git tag v0.0.8
git push origin master --tags
```
