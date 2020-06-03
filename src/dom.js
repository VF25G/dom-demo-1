window.dom = {
    create(string) {
      const container = document.createElement("template")
      container.innerHTML = string.trim() // 删除字符串头尾可能存在的空格
      return container.content.firstChild
    },
    
    after(node, insertNode) {
      node.parentNode.insertBefore(insertNode, node.nextSibling)
    },
    before(node, insertNode) {
      node.parentNode.insertBefore(insertNode, node)
    },
    append(parent, node) {
      parent.appendChild(node)
    },
    wrap(node, parent) {
      dom.before(node, parent) // 让parent与node处于同一层树节点中
      dom.append(parent. node)
    },
    
    remove(node) {
      node.parentNode.removeChild(node)
      return node
    },
    empty(node) {
      const array = []
      let nodeFirstChild = node.firstChild
      while(nodeFirstChild) {
        array.push(dom.remove(nodeFirstChild))
        nodeFirstChild = node.firstChild
      }
      return array
    },
    
    attr(node, name, value) {
      if(arguments.length === 3) {
        node.setAttribute(name, value)
      } else if (arguments.length === 2) {
        return node.getAttribute(name)
      }
    },
    text(node, string) {
      if(arguments.length === 2) {
        if('innerText' in node) { // 适配IE
          node.innerText === string
        } else {
          node.textContent = string
        }
      } else if (arguments.length === 1) {
        if('innerText' in node) {
          return node.innerText
        } else {
          return node.textContent
        }
      }
    },
    html(node, string) {
      if(arguments.length === 2) {
        node.innerHTML = string
      } else if(arguments.length === 1) {
        return node.innerHTML
      }
    },
    style(node, name, value) {
      if(arguments.length === 3) { // dom.style(div, 'color', 'red')
        node.style[name] = value
      } else if(arguments.length === 2) {
        if((typeof name) === 'string') { // dom.style(div, 'color')
          return node.style[name]
        } else if (name instanceof Object) {
          const object = name
          for(let key in object) {
            node.style[key] = object[key]
          }
        }
      }
    },
    
    class: {
      add(node, className) {
        node.classList.add(className)
      },
      remove(node, className) {
        node.classList.remove(className)
      },
      has(node, className) {
        return node.classList.contains(className)
      }
    },
    
    // fn函数为具名函数，以便于删除
    on(node, eventName, fn) {
      node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
      node.removeEventListener(eventName, fn)
    },
    
    find(selector, scope) {
      return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
      return node.parentNode
    },
    children(node) {
      return node.children
    },
    siblings(node) {
      let children = node.parentNode.children
      return Array.from(children).filter(otherNode => otherNode !== node)
    },
    next(node) {
      let nodeNextSibling = node.nextSibling
      while(nodeNextSibling && nodeNextSibling.nodeType === 3) {
        nodeNextSibling = nodeNextSibling.nextSibling
      }
      return nodeNextSibling
    },
    previous(node) {
      let nodePreviousSibling = node.previousSibling
      while(nodePreviousSibling && nodePreviousSibling.nodeType === 3) {
        nodePreviousSibling = nodePreviousSibling.previousSibling
      }
      return nodePreviousSibling
    },
    
    each(nodeList, fn) {
      for(let index = 0; index < nodeList.length; index++) {
        fn.call(null, nodeList[index])
      }
    },
    index(node) {
      const list = dom.children(node.parentNode)
      for(let i = 0; i < list.length; i++) {
        if(list[i] === node) {
          return i
        }
      }
    }
    
  }