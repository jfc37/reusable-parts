# Fuse UI library

Taken from [Fuse repo](https://github.com/withinpixels/fuse2)

## Update steps

### 1. Copy files across

Get files from [https://github.com/withinpixels/fuse2/tree/master/src/%40fuse](https://github.com/withinpixels/fuse2/tree/master/src/%40fuse) and copy update `@fuse` folder

### 2. Update dependencies

Copy all dependencies from [https://github.com/withinpixels/fuse2/blob/master/package.json](https://github.com/withinpixels/fuse2/blob/master/package.json) into `package.json` at workspace level.
Remove duplicates.
Run `npm install`

### 3. Fix reference errors

Replace `'@fuse` with `'@reusable-parts/fuse/src/lib/@fuse`
Replace `src/@fuse/scss` with `libs/fuse/src/lib/@fuse/scss`
Replace `src/@fuse/components` with `libs/fuse/src/lib/@fuse/components`

### Done!
