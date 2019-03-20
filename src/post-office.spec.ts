import test from 'ava';

test('should be foo', async t => {
  const bar = Promise.resolve('foo');
  t.is(await bar, 'foo');
});

test('should be bar', async t => {
  const bar = Promise.resolve('foo');
  t.is(await bar, 'bar');
});
