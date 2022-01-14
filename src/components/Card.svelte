<!--
  File: \src\components\Card.svelte
  Project: svelte-app
  Created Date: 2022-01-14 Friday 02:39:23
  Author: transpine(transpine@gmail.com)
  ----------------------------------------------
  Last Modified: 2022-01-14 Friday 11:43:26
  Modified By: transpine
  ----------------------------------------------
  Copyright (c) 2022 devfac
  
  All rights reserved to transpine@gmail.com
-->


<script>
import { tick, createEventDispatcher, onDestroy } from "svelte";
import { autoFocusout } from '../actions/autoFocusout'
import { cards } from "../store/list";

  let isEditMode = false
  let title
  let textareaEl

  const dispatch = createEventDispatcher();

  export let listId
  export let card

  function saveCard(){
    if ( title.trim()){
      cards.edit({
        listId,
        cardId: card.id,
        title
      })
    }

    offEditMode()
  }

  function removeCard(){
    cards.remove({
      listId,
      cardId: card.id
    })

    offEditMode()
  }

  async function onEditMode(){
    isEditMode = true;
    title = card.title;
    await tick()
    textareaEl && textareaEl.focus()
    dispatch('editMode', true)
  }

  function offEditMode(){
    isEditMode = false;
    dispatch('editMode', false)
  }

  onDestroy(()=>{
    offEditMode();
  })

</script>

<div class="card">
  {#if isEditMode}
  <div class="edit-mode" use:autoFocusout={offEditMode}>
    <textarea bind:value={title}
    bind:this={textareaEl}
    placeholder="Enter title"
    on:keydown={(e)=>{
      e.key === 'Enter' && saveCard()
      e.key === 'Escape' && offEditMode()
      e.key === 'Esc' && offEditMode()
    }}></textarea>
    <div class="actions">
      <div class="btn success" on:click={saveCard}>SAVE</div>
      <div class="btn" on:click={offEditMode}>CANCEL</div>
      <div class="btn danger" on:click={removeCard}>DEL</div>
    </div>
  </div>
  {:else}
    <div class="title">
      {card.title}
      <div class="btn small"
      on:click={onEditMode}>EDIT</div>
    </div>
  {/if}
</div>

<style lang="scss">
  .card{
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 1px;
    }

    position: relative;
    
    :global(&.sortable-ghost) {
      opacity: .1;
      &::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        border-radius: 4px;
      }      
    }

    :global(&.sortable-chosen){
      cursor: move;
    }
    .title{
      background: white;
      padding: 6px 7px;
      border-radius: 4px;
      box-shadow: 0 1px 0 rgba(9, 30, 66, .25);
      line-height: 20px;
      position: relative;

      &:hover{
        background: #f5f5f5;
      }

      .btn {
        position: absolute;
        top: 6px;
        right: 8px;
        display: none;
      }

      &:hover .btn {
        display: block;
      }
    }
  }
</style>