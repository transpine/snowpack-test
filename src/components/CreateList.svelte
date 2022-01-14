<script>
  import { lists } from '~/store/list';
  import { tick } from 'svelte';
  import { autoFocusout } from '../actions/autoFocusout';

  let isEditMode = false
  let title = ''

  let textareaEl

  async function onEditMode(){
    isEditMode = true;
    await tick();
    textareaEl && textareaEl.focus()
  }

  function offEditMode(){
    isEditMode = false;
    title = ''
  }

  function addList(){
    if (title.trim()){
      lists.add({
      title
    })
    }

    offEditMode();
  }
</script>

<div class="create-list">
  {#if isEditMode}
    <div 
      use:autoFocusout={offEditMode}
      class="edit-mode"
    >
      <textarea 
        bind:value={title} 
        bind:this={textareaEl}
        placeholder="Enter title"
        on:keydown={e => { 
          e.key === 'Enter' && addList()
          e.key === 'Escape' && offEditMode()
          e.key === 'Esc' && offEditMode()
        }}
      ></textarea>
      <div class="actions">
        <div class="btn success" on:click={addList}>ADD</div>
        <div class="btn" on:click={offEditMode}>CANCEL</div>
      </div>
    </div>
  {:else}
    <div class="add-another-list" on:click={onEditMode}>
      +Add List
    </div>
  {/if}
</div>

<style lang="scss">
  // @import "../scss/main.scss";

  .create-list {
    white-space: normal;
    font-size: 16px;
    display: inline-block;
    width: 290px;
    padding: 10px 8px;
    vertical-align: top;

    background: rgba(#ebecf0, .6);
    border-radius: 4px;
    margin: 0 4px;
    line-height: 20px;
    cursor: pointer;
    transition: .2s;

    &:hover{
    background: #ebecf0;
    }
  }

</style>