module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === 'msw' || pkg.name === 'sharp') {
        pkg.scripts = pkg.scripts || {};
      }
      return pkg;
    },
  },
};
