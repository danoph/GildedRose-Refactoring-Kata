function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var NormalItem = function() {
  var self = this;

  self.update = function() {
    self.updateSellIn();
    self.updateQuality();
  };

  self.updateQuality = function() {
    self.quality -= 1;
  }
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

function update_sell_in(item) {
  if (item.name != 'Sulfuras, Hand of Ragnaros') {
    item.sell_in -= 1;
  }
}

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    item = items[i];

    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        subtract_quality(item);
      }

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

    update_sell_in(item);

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
  }
}
