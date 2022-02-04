import ToolbarArea from './ToolbarArea.js';
import ContentEditingArea from './ContentEditingArea.js';

const styles = {
  minWidth: '300px',
};

const tagMap = {
  bold: ['B', 'STRONG'],
  italic: ['I', 'EM'],
  strikethrough: ['STRIKE', 'S'],
  underline: ['U', 'U'],
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

const handleAppliedCommand = (range, command) => {
  console.log('handleAppliedCommand');
  /*
    * 현재 상황
    * 1) 드래그한 영역에 선택한 강조표시가 이미 적용되어 있음을 안다.
    * 2) 그러나 강조표시가 어느 범위만큼 적용되어 있는지는 모르는 상태다.

    목표 1. 선택한 영역 내 텍스트 모두에 강조표시가 적용되어 있다면 해당 강조 표시를 해제시킨다.
    목표 2. 선택한 영역 내 텍스트 일부에만 강조표시가 적용되어 있다면 남은 부분도 강조표시를 해제시킨다.
  */

  // const contents = range.extractContents();
  const contents = range.cloneContents();
  // 삽입할 새로운 range를 clone하여 만들어두고,넣을 내용을 알맞게 조작해둠.
  // 기존 range 내용은 삭제하고, 만들어둔 내용을 insert함.

  tagMap[command].forEach((tag) => {
    const elements = contents.querySelectorAll(tag.toLowerCase());
    if (elements.length > 0) {
      elements.forEach((element) => {
        const commandHTML = element.innerHTML;
        const val = range.createContextualFragment(commandHTML);

        console.log(val);
        element.replaceWith(val);
      });

      range.deleteContents();
      range.insertNode(contents);
      range.collapse();
      Array.from(
        document
          .querySelector('.carlton-content-editing-area')
          .querySelectorAll('*')
      ).forEach((element) => {
        if (element.textContent === '') {
          element.remove();
        }
      });
      Array.from(
        document
          .querySelector('.carlton-content-editing-area')
          .querySelectorAll('span')
      ).forEach((element) => {
        const childSpan = element.querySelector('span');

        if (childSpan) {
          element.innerHTML = childSpan.innerHTML;
        }
      });
    } else {
      // 이미 태그가 있는 경우이며, length가 없다는 건 그 부분이 모두 같은 강조 표시로 되어 있다는 것.
      const newElement = document.createElement('span');

      function getParent(tagName, range) {
        let ret;

        ret = range.commonAncestorContainer;

        while (ret && ret.tagName !== tagName) {
          ret = ret.parentNode;
        }
        return ret;
      }

      const parent = getParent(tag.toUpperCase(), range);

      if (!parent) {
        return;
      }
      range.surroundContents(newElement);

      const newFragElement = document.createDocumentFragment();

      parent.childNodes.forEach((childNode) => {
        if (childNode.tagName === 'SPAN') {
          const tempFragElement = document.createDocumentFragment();
          const tempHTML = childNode.innerHTML;
          const tempVal = range.createContextualFragment(tempHTML);

          tempFragElement.append(tempVal);
          newFragElement.append(tempFragElement);
        } else {
          const temp = document.createElement(tag.toLowerCase());
          if (childNode.innerHTML) {
            temp.innerHTML = childNode.innerHTML;
          } else {
            temp.innerHTML = childNode.textContent;
          }
          newFragElement.appendChild(temp);
        }
      });

      Array.from(newFragElement.children).forEach((element) => {
        if (element.textContent === '') {
          element.remove();
        }
      });

      parent.parentNode.replaceChild(
        newFragElement,
        range.commonAncestorContainer
      );
      // range insert 필요?

      range.collapse();
      Array.from(
        document.querySelector('.carlton-content-editing-area').children
      ).forEach((element) => {
        if (element.textContent === '') {
          element.remove();
        }
      });
    }
    Array.from(
      document
        .querySelector('.carlton-content-editing-area')
        .querySelectorAll('*')
    ).forEach((element) => {
      if (element.textContent === '') {
        element.remove();
      }
    });
    Array.from(
      document
        .querySelector('.carlton-content-editing-area')
        .querySelectorAll('span')
    ).forEach((element) => {
      const childSpan = element.querySelector('span');

      if (childSpan) {
        element.innerHTML = childSpan.innerHTML;
      }
    });
  });
};

const executeTextCommand = (command) => {
  /**
   *  1. range가 있는지 확인한다.
   *    1.1 range가 없다면 return;
   */
  const sel = window.getSelection();

  if (!sel.baseNode) {
    // no selection
    return;
  }
  const range = sel.getRangeAt(0);

  if (range.collapsed) {
    return;
  }

  /**  2. 강조 효과를 확인한다.
   *    2.1 tagname을 반환한 array
   *    2.2 filter
   *    2.3 태그랑 비교하여 현재 내가 누른 명령어가 적용되어 있는지 확인한다.
   *
   */

  const isApplied = getNodesInRange(range.cloneRange()).some((element) => {
    // const isApplied = getNodesInRange(range).some((element) => {
    if (
      element.nodeType !== 3 &&
      element.className !== 'carlton-content-editing-area' &&
      !element.querySelector('.carlton-content-editing-area') &&
      (element.querySelector(tagMap[command][0].toLowerCase()) ||
        element.querySelector(tagMap[command][1].toLowerCase()))
    ) {
      return true;
    } else if (tagMap[command].some((tag) => tag === element.tagName)) {
      return true;
    } else if (
      ['BODY', 'HTML', document].includes(element.tagName) ||
      element.className === 'carlton-content-editing-area'
    ) {
      return false;
    }
    return false;
  });

  // 3. 강조효과가 없었다면 -> surround
  if (!isApplied) {
    const newElement = document.createElement(tagMap[command][1]);

    newElement.appendChild(range.extractContents());
    range.insertNode(newElement);
    range.collapse();
    return;
  }

  // 4. 강조효과가 있다면
  handleAppliedCommand(range, command);
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
