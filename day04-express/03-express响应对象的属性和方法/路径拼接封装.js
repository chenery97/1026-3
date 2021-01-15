function pathSolve(absolutePath, sourceFile) {
  // 1.获取绝对路径中最后一个\的下标
  let pathIndex = absolutePath.lastIndexOf("\\");
  // 2.获取文件参数中所有 ../ 或 ./ 符号
  const arr = sourceFile.match(/.{1,2}\//g);
  // 3.获取文件名
  const fileName = sourceFile.slice(sourceFile.lastIndexOf("/") - 1);
  // 4.遍历上面获取到符号的数组
  arr.some((item) => {
    // 5.判断是否为 ../ , 不是则直接返回不做处理
    if (item !== "../") {
      return;
    }
    // 6.是则对绝对路径进行切割
    absolutePath = absolutePath.slice(0, pathIndex);
    // 7.从新获取到绝对路径最后一个\ 的下标
    pathIndex = absolutePath.lastIndexOf("\\");
    // 8.如果绝对路径最后一个 \ 的下标结果为-1，证明已经到盘符根目录了，无法再继续往上一级走
    if (pathIndex === -1) {
      console.warn("已经到盘符了");
      return true;
    }
  });
  // 9.返回最后拼接的绝对路径
  return absolutePath + "\\" + fileName;
}
