<style lang="scss">
.add-another-card {
  padding: 4px 8px;
  font-size: 14px;
  color: #5e6c84;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
}
</style>

<script>
import { tick, createEventDispatcher, onDestroy } from "svelte";
import { cards } from '../store/list';

import { autoFocusout } from "../actions/autoFocusout";

export let listId
const dispatcher = createEventDispatcher()

let isEditMode = false;
let title = "";
let textareaEl;

function addCard() {
  if (title.trim()){
    cards.add({
      listId,
      title
    })
  }

  offEditMode()
}

async function onEditMode() {
  isEditMode = true;
  title = "";
  await tick();
  textareaEl && textareaEl.focus();
  dispatcher('editMode', true)
}
function offEditMode() {
  isEditMode = false;
  dispatcher('editMode', false)
}

onDestroy(()=>{
  offEditMode()
})
</script>

{#if isEditMode}
  <div use:autoFocusout="{offEditMode}" class="edit-mode">
    <textarea
      bind:value="{title}"
      bind:this="{textareaEl}"
      placeholder="Title"
      on:keydown="{(e) => {
        e.key === 'Enter' && addCard();
        e.key === 'Escape' && offEditMode();
        e.key === 'Esc' && offEditMode();
      }}"></textarea>
    <div class="actions">
      <div class="btn success" on:click="{addCard}">ADD CARD</div>
      <div class="btn" on:click="{offEditMode}">CANCEL</div>
      <!-- <div class="btn danger" on:click="{removeCard}">DEL</div> -->
    </div>
  </div>
{:else}
  <div class="add-another-card" on:click="{onEditMode}">+ADD CARD</div>
{/if}
