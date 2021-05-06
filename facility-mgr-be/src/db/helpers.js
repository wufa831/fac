const getMeta = () => {
  return {
      createdAt: {
        type: Number,
        default: (new Date()).getTime(),
      },
      updatedAt: {
        type: Number,
        default: (new Date()).getTime(),
      },
    
  };
};

const preSave = function(next) {//保存之前做。。。箭头函数没有this所以要写普通函数 next用于告诉mongoose做之后要做的事情
  if (this.isNew) {
    const ts = Date.now();

    this['meta'].createdAt = ts;
    this['meta'].updatedAt = ts;
  } else {
    this['meta'].updatedAt = Date.now();
  }

  next();
};

module.exports = {
  getMeta,
  preSave,
};
