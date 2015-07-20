function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var ItemFactory = function(item) {
  var self = this;

  self.buildItem = function(item) {
    if (item.name == 'Sulfuras, Hand of Ragnaros') {
      return new SulfurasItem(item);
    } else {
      return new NormalItem(item);
    }
  };
};

var SulfurasItem = function(item) {
  var self = this;

  self.update = function() {
  };
};

var NormalItem = function(item) {
  var self = this;

  self.update = function() {
    self.updateQuality();
    self.updateSellIn();
    self.updateQuality2();
  };

  self.updateQuality = function() {
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      subtract_quality(item);

      if (item.name == 'Conjured Mana Cake') {
        subtract_quality(item);
      }
    } else {
      add_quality(item);

      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sell_in < 11) {
          add_quality(item);
        }
        if (item.sell_in < 6) {
          add_quality(item);
        }
      }
    }
  }

  self.updateSellIn = function() {
    item.sell_in -= 1;
  };

  self.updateQuality2 = function() {
    if (item.sell_in < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            subtract_quality(item);
          }
        } else {
          item.quality = item.quality - item.quality
        }
      } else {
        add_quality(item);
      }
    }
  };
};

var items = [];

function subtract_quality(item) {
  if (item.quality > 0) {
    item.quality -= 1;
  }
}

function add_quality(item) {
  if (item.quality < 50) {
    item.quality += 1;
  }
}

function update_quality() {
  var itemFactory = new ItemFactory();

  for (var i = 0; i < items.length; i++) {
    var item = itemFactory.buildItem(items[i]);
    item.update();
  }
}
