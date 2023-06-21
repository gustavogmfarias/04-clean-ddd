import { WatchedList } from "@/core/entities/watched-list";

class NumberWatchedList extends WatchedList<number> {
  //como a watched list é um classe abstrata, criei uma nova que extende ela.

  compareItems(a: number, b: number): boolean {
    //compare items precisa ser também criado, se não dá erro, pois é um metodo abstrato.
    return a === b;
  }
}

describe("watched list", () => {
  it("should be able to create a watched list with initial items", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.currentItems).toHaveLength(3); //só testando se temos 3 itens como esprado na hora de criar.
  });

  it("should be able to add new items to the list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);

    expect(list.currentItems).toHaveLength(4);
    expect(list.getNewItems()).toEqual([4]);
  });

  it("should be able to remove items from the list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);

    expect(list.currentItems).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([2]);
  });

  it("should be able to add an item even if it was removed before", () => {
    //mesmo removendo o itens, eu tenho acesso a ele pra recuperá-lo posteriormente no getremoveditems. Por exemplo se eu removo e depois adiciono, la nos metodos da classe vai remover dos removidos o 2 e vai adicionar novamente.
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(2);
    list.add(2);

    expect(list.currentItems).toHaveLength(3);

    expect(list.getRemovedItems()).toEqual([]);
    expect(list.getNewItems()).toEqual([]);
  });

  it("should be able to remove an item even if it was added before", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);
    list.remove(4);

    expect(list.currentItems).toHaveLength(3);

    expect(list.getRemovedItems()).toEqual([]);
    expect(list.getNewItems()).toEqual([]);
  });

  it("should be able to update watched list items", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.update([1, 3, 5]);

    expect(list.getRemovedItems()).toEqual([2]); //o metodo update compara o valor do updte com o valor inicial e adiciona ou remove itens.
    expect(list.getNewItems()).toEqual([5]); //foi o único adicionado.
  });
});
