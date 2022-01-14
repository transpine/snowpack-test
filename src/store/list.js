import { writable, get } from "svelte/store";
import { v4 as uuid } from "uuid";
// import _ from 'lodash';
import _find from 'lodash/find';
import _remove from 'lodash/remove';
import _clondeDeep from 'lodash/cloneDeep';

const repoLists = JSON.parse(window.localStorage.getItem("lists")) || [];

const _lists = writable(repoLists);
_lists.subscribe(($lists) => {
  window.localStorage.setItem("lists", JSON.stringify($lists));
});

export const lists = {
  subscribe: _lists.subscribe,
  add(payload) {
    const { title } = payload;
    _lists.update(($lists) => {
      $lists.push({
        id: uuid(),
        // id: '',
        title,
        cards: [],
      });

      console.log(get(_lists));
      return $lists;
    });
  },
  edit(payload){
    const { listId, title } = payload
    _lists.update($lists => {

      const foundList = _find($lists, { id: listId })
      foundList.title = title
      return $lists
    })
  },
  remove(payload){
    const { listId } = payload
    _lists.update($lists =>{
      _remove($lists, { id: listId })
      return $lists
    })
  },
  reorder(payload){
    const { oldIndex, newIndex } = payload
    _lists.update( ($lists)=>{
      const clone = _clondeDeep($lists[oldIndex])
      $lists.splice(oldIndex, 1)
      $lists.splice(newIndex, 0, clone)

      return $lists
    })

  }

};

export const cards = {
  add(payload) {
    const { listId, title } = payload
    _lists.update( ($lists) => {
      const foundList = _find($lists, { id: listId })
      foundList.cards.push({
        id: uuid(),
        title
      })
      return $lists
    })
  },
  edit(payload) {
    const { listId, cardId, title } = payload
    _lists.update( ($lists) => {
      const foundList = _find( $lists, { id: listId})
      const foundCard = _find( foundList.cards, { id: cardId })
      foundCard.title = title
      return $lists;
    })
  },
  remove(payload){
    const { listId, cardId } = payload
    _lists.update( ($lists) => {
      const foundList = _find( $lists, { id: listId})
      _remove( foundList.cards, { id: cardId })
      return $lists;
    })
  },
  reorder(payload){
    const { fromListId, toListId, oldIndex, newIndex } = payload
    console.log( fromListId, toListId, oldIndex, newIndex )
    _lists.update( ($lists) => {
      const fromList = _find( $lists, { id: fromListId})
      const toList = fromListId === toListId ? fromList : _find( $lists, { id: toListId })

      const clone = _clondeDeep(fromList.cards[oldIndex])
      fromList.cards.splice(oldIndex, 1)
      toList.cards.splice(newIndex, 0, clone)

      return $lists
    })
  }
}