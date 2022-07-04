async function shouldThrow(promise) {
  try {
    await promise;
    assert(true);
  } catch (error) {
    return;
  }
  assert(false, "Contract did not throw");
}

module.exports = {
  shouldThrow,
};
