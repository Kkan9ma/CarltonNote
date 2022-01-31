import ToolbarArea from './ToolbarArea.js';
import ContentEditingArea from './ContentEditingArea.js';

const styles = {
  minWidth: '300px',
};

// cf) https://stackoverflow.com/a/7931003
function getNextNode(node) {
  if (node.firstChild) {
    return node.firstChild;
  }
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

function getNodesInRange(range) {
  const start = range.startContainer;
  const end = range.endContainer;
  const commonAncestor = range.commonAncestorContainer;
  const nodes = [];
  let node;

  // walk parent nodes from start to common ancestor
  for (node = start.parentNode; node; node = node.parentNode) {
    nodes.push(node);
    if (node === commonAncestor) {
      break;
    }
  }
  nodes.reverse();

  // walk children and siblings from start until end is found
  for (node = start; node; node = getNextNode(node)) {
    nodes.push(node);
    if (node === end) {
      break;
    }
  }

  return nodes;
}

const executeMediaCommand = (command) => {};

const executeTextCommand = (command) => {
  /**
   *  1. range가 있는지 확인한다.
   *    1.1 range가 없다면 return;
   *
   *  2. 강조 효과를 확인한다.
   *    2.1 tagname을 반환한 array
   *    2.2 filter
   *    2.3 태그맵이랑 비교하여 현재 내가 누른 명령어가 적용되어 있는지 확인한다.
   *
   *  3.
   */
  const sel = window.getSelection();

  if (!sel.baseNode) {
    // no selection
    return;
  }
  const range = sel.getRangeAt(0);

  if (Math.abs(range.startOffset - range.endOffset) === 0) {
    // no range
    return;
  }

  const tagMap = {
    bold: ['B', 'STRONG'],
    italic: ['I', 'EM'],
    strikethrough: ['STRIKE', 'S'],
    underline: ['U'],
  };

  const currentCommands = getNodesInRange(range)
    .map((node) => node.tagName)
    .filter((node) => Object.values(tagMap).flat().includes(node));

  const isApplied = currentCommands.some((currentCommand) =>
    tagMap[command].some((tag) => tag === currentCommand)
  );

  console.log(isApplied);
};

export default function NoteContainer({ $target, commandsList }) {
  const $noteContainer = document.createElement('div');

  $noteContainer.id = 'note-container';

  this.target = $target;
  this.commandsList = commandsList;
  this.target.appendChild($noteContainer);

  this.toolbar = new ToolbarArea({
    $target: $noteContainer,
    commandsList: this.commandsList,
    executeTextCommand,
    executeMediaCommand: executeMediaCommand,
  });

  this.contentEditingArea = new ContentEditingArea({
    $target: $noteContainer,
    commandsList,
  });

  for (const style in styles) {
    $noteContainer.style[style] = styles[style];
  }

  this.render = () => {
    this.toolbar.render();
    this.contentEditingArea.render();
  };
}
