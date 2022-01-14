<script>
  import List from './List.svelte';
  import CreateList from './CreateList.svelte';
  import { lists } from '../store/list';
  import { onMount } from 'svelte';
  import Sortable from 'sortablejs';

  let listsEl
  let sortableList 

  onMount(()=>{
    sortableList = new Sortable(listsEl, {
      group: "My List",
      handle: '.list',
      delay: 50,
      animation: 0,
      forceFallback: true,
      onEnd(event){
        console.log(event);
        lists.reorder({
          oldIndex: event.oldIndex,
          newIndex: event.newIndex
        })
      }
    });
  })
</script>


<div class="list-container">
  <div
    bind:this={listsEl}

    class="lists">
    {#each $lists as list (list.id)}
      <List 
        {list}
        {sortableList}
         />
    {/each}

  </div>
  <CreateList />
</div>

<style lang="scss">
  .list-container {
    width: 100vw;
    height: calc(100vh - 40px);
    padding: 30px;

    // border: 10px solid red;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 0;

    .lists {
      display: inline-block;
      height: 100%;
      // border: 10px solid blue;
      // box-sizing: border-box;
      white-space: nowrap;
      font-size: 0;
    }
  }
</style>