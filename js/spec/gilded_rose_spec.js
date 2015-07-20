describe("Gilded Rose", function() {
  beforeEach(function() {
    items = [
      new Item('+5 Dexterity Vest', 10, 20),
      new Item('Aged Brie', 2, 0),
      new Item('Elixir of the Mongoose', 5, 7),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Sulfuras, Hand of Ragnaros', -1, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50),
      new Item('Conjured Mana Cake', 3, 6)
    ];
  });

  describe('update_quality', function() {
    var item;

    describe('normal item', function() {
      beforeEach(function() {
        item = items[0];
      });

      it('decreases normally', function() {
        update_quality();

        expect(item.name).toEqual('+5 Dexterity Vest');
        expect(item.sell_in).toEqual(9);
        expect(item.quality).toEqual(19);
      });

      describe('quality does not go below 0', function() {
        beforeEach(function() {
          item.quality = 0;
        });

        it('quality does not go below 0', function() {
          update_quality();
          expect(item.quality).toEqual(0);
        });
      });

      describe('sell_in', function() {
        beforeEach(function() {
          item.sell_in = 0;
        });

        it('goes negative', function() {
          update_quality();
          expect(item.sell_in).toEqual(-1);
        });
      });

      describe('degrades quality faster when sell by date past', function() {
        beforeEach(function() {
          item.sell_in = 0;
          item.quality = 10;
        });

        it('degrades correctly', function() {
          update_quality();

          expect(item.sell_in).toEqual(-1);
          expect(item.quality).toEqual(8);
        });
      });
    });

    describe('aged brie', function() {
      beforeEach(function() {
        item = items[1];
      });

      it('increase in quality when sell_in decreases', function() {
        update_quality();

        expect(item.name).toEqual('Aged Brie');
        expect(item.sell_in).toEqual(1);
        expect(item.quality).toEqual(1);
      });
    });

    describe('elixir', function() {
      beforeEach(function() {
        item = items[2];
      });

      it('decreases normally', function() {
        update_quality();

        expect(item.name).toEqual('Elixir of the Mongoose');
        expect(item.sell_in).toEqual(4);
        expect(item.quality).toEqual(6);
      });
    });

    describe('sulfuras', function() {
      beforeEach(function() {
        item = items[3];
      });

      it('never decreases quality or sell by date', function() {
        update_quality();

        expect(item.name).toEqual('Sulfuras, Hand of Ragnaros');
        expect(item.sell_in).toEqual(0);
        expect(item.quality).toEqual(80);
      });
    });

    describe('sulfuras 2', function() {
      beforeEach(function() {
        item = items[4];
      });

      it('never decreases quality or sell by date', function() {
        update_quality();

        expect(item.name).toEqual('Sulfuras, Hand of Ragnaros');
        expect(item.sell_in).toEqual(-1);
        expect(item.quality).toEqual(80);
      });
    });

    describe('backstage passes 1', function() {
      beforeEach(function() {
        item = items[5];
      });

      it('never decreases quality or sell by date', function() {
        update_quality();

        expect(item.name).toEqual('Backstage passes to a TAFKAL80ETC concert');
        expect(item.sell_in).toEqual(14);
        expect(item.quality).toEqual(21);
      });
    });

    describe('backstage passes 2', function() {
      beforeEach(function() {
        item = items[6];
      });

      it('never decreases quality or sell by date', function() {
        update_quality();

        expect(item.name).toEqual('Backstage passes to a TAFKAL80ETC concert');
        expect(item.sell_in).toEqual(9);
        expect(item.quality).toEqual(50);
      });
    });

    describe('backstage passes 3', function() {
      beforeEach(function() {
        item = items[7];
      });

      it('never decreases quality or sell by date', function() {
        update_quality();

        expect(item.name).toEqual('Backstage passes to a TAFKAL80ETC concert');
        expect(item.sell_in).toEqual(4);
        expect(item.quality).toEqual(50);
      });
    });

    describe('backstage passes 4', function() {
      beforeEach(function() {
        item = items[8];
      });

      it('never decreases quality or sell by date', function() {
        update_quality();

        expect(item.name).toEqual('Backstage passes to a TAFKAL80ETC concert');
        expect(item.sell_in).toEqual(-1);
        expect(item.quality).toEqual(0);
      });
    });

    describe('conjured mana cake', function() {
      beforeEach(function() {
        item = items[9];
      });

      it('never decreases quality or sell by date', function() {
        update_quality();

        expect(item.name).toEqual('Conjured Mana Cake');
        expect(item.sell_in).toEqual(2);
        expect(item.quality).toEqual(4);
      });
    });
  });
});
