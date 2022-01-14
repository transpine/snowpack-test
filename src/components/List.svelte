<style lang="scss">
.list {
  display: inline-block;
  word-break: break-all;
  width: 290px;
  height: 100%;
  box-sizing: border-box;
  font-size: 16px;
  white-space: normal;
  margin: 0 4px;
  line-height: 20px;

  :global(&.sortable-ghost) {
    position: relative;
    opacity: 0.4;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background: black;
    }
  }

  :global(&.sortable-chosen) {
    cursor: move;
  }
  .list__inner {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    padding: 10px 8px;
    background: #edecf0;
    border-radius: 4px;

    .list__heading {
      box-sizing: border-box;
      margin-bottom: 10px;

      p {
        color: #5e6c84;
        padding: 0 8px;
      }
    }
    .list__cards {
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      margin-bottom: 10px;
    }
  }
}
</style>

<script>
import CreateCard from "./CreateCard.svelte";
import ListTitle from "./ListTitle.svelte";
import Card from "./Card.svelte";
import Sortable from "sortablejs";
import { onMount } from "svelte";
import { cards } from "../store/list";

export let list;
export let sortableList;

let sortableCards;
let cardsEl;

function disableSortable(event) {
  sortableList.option("disabled", event.detail);
  sortableCards.option("disabled", event.detail);
}

onMount(() => {
  sortableCards = new Sortable(cardsEl, {
    group: "My Cards",
    handle: ".card",
    delay: 50,
    animation: 0,
    forceFallback: true,
    onEnd(event) {
      console.log(event);
      cards.reorder({
        fromListId: event.from.dataset.listId, //data속성사용
        toListId: event.to.dataset.listId,
        oldIndex: event.oldIndex,
        newIndex: event.newIndex,
      });
    },
  });
});
</script>

<div class="list">
  <div class="list__inner">
    <div class="list__heading">
      <ListTitle list="{list}" on:editMode="{disableSortable}" />
      <p>{list.cards.length} cards</p>
    </div>
    <div data-list-id="{list.id}" class="list__cards" bind:this="{cardsEl}">
      {#each list.cards as card (card.id)}
        <Card
          card="{card}"
          listId="{list.id}"
          on:editMode="{disableSortable}" />
      {/each}
    </div>
    <CreateCard listId="{list.id}" on:editMode="{disableSortable}" />
  </div>
</div>
