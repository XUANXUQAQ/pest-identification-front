const arrayUtils = {
  deleteItemById(id, list) {
    // 先遍历list里面的每一个元素，对比item与每个元素的id是否相等，再利用splice的方法删除
    let count = 0;
    list.forEach((each) => {
      if (each.id === id) {
        list.splice(count, 1);
        return count;
      }
      count += 1;
      return count;
    });
    return count;
  },
};

export default arrayUtils;
