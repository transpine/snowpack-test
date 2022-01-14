<!--
  File: \src\components\ListTitle.svelte
  Project: svelte-app
  Created Date: 2022-01-14 Friday 02:10:51
  Author: transpine(transpine@gmail.com)
  ----------------------------------------------
  Last Modified: 2022-01-14 Friday 11:39:18
  Modified By: transpine
  ----------------------------------------------
  Copyright (c) 2022 devfac
  
  All rights reserved to transpine@gmail.com
-->



<script>
  import { createEventDispatcher, onDestroy, tick } from 'svelte';
  import { autoFocusout } from '../actions/autoFocusout';
  import { lists } from '../store/list'
  export let list
  
  let isEditMode = false
  let title = list.title
  let textareaEl
  const dispatch = createEventDispatcher()

  function saveTitle() {
    if (title.trim()){
      lists.edit({
        listId: list.id,
        title
      })      
    }
    offEditMode()
  }

  function removeList() {
    lists.remove({
      listId: list.id
    })
    offEditMode()
  }

  async function onEditMode() {
    isEditMode = true;
    title = list.title;

    await tick();
    textareaEl && textareaEl.focus()
    dispatch('editMode', true)
  }

  function offEditMode() {
    isEditMode = false;
    dispatch('editMode', false)
  }

  onDestroy(()=>{
    offEditMode();
  })
</script>

{#if isEditMode}
<div
  use:autoFocusout={offEditMode}
  class="edit-mode">
  <textarea name="" id="" cols="30" rows="10" bind:value={title} bind:this={textareaEl} placeholder="Title"
    on:keydown={(e)=>{
      e.key === 'Enter' && saveTitle()
      e.key === 'Escape' && offEditMode()
      e.key === 'Esc' && offEditMode()
    }}></textarea>
  <div class="actions">
    <div class="btn success" on:click={saveTitle}>SAVE</div>
    <div class="btn" on:click={offEditMode}>CANCEL</div>
    <div class="btn danger" on:click={removeList}>DELETE</div>
  </div>
</div>
{:else}
<h2 class="title">
  {list.title}
  <div 
    on:click={onEditMode}
    class="btn small edit-for-list">Edit</div>
</h2>
{/if}

<style lang="scss">
  h2.title {
    font-weight: 700;
    padding: 4px 8px;
    cursor: pointer;
    position: relative;

    .btn{
      position: absolute;
      top: 0;
      right: 0;
      display: none;
    }
  }

  // :global(.list__inner:hover h2.title .btn.small.edit-for-list){
  //   display: block;
  // }
  :global(.list__inner:hover .edit-for-list){
    display: block!important;
  }
</style>