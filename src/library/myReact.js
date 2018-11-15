// Simple composite component
const TopLevelWrapper = function(props) {
  this.props = props;
};

TopLevelWrapper.prototype.render = function() {
  return this.props;
};

// Responsible for putting the element on the dom
class FeactDOMComponent {
  constructor(element) {
    this._currentElement = element;
  }

  /**
     react element will be looked like
     React.createElement('div',{},React.createElement(div,{},'Test'))
    {
      type:'div',
      props: {
        children : 
      }
    }
    */
  mountComponent(container) {
    const domElement = document.createElement(this._currentElement.type);
    const text = this._currentElement.props.children;
    const textNode = document.createTextNode(text);
    domElement.appendChild(textNode);
    container.appendChild(domElement);
    this._hostNode = domElement;
    return domElement;
  }
}

// Convert class to the element
class FeactCompositeComponentWrapper {
  constructor(element) {
    this._currentElement = element;
  }

  mountComponent(container) {
    const Component = this._currentElement.type;
    const componentInstance = new Component(this._currentElement.props);
    let element = componentInstance.render();

    while (typeof element.type === "function") {
      element = new element.type(element.props).render();
    }

    const domComponentInstance = new FeactDOMComponent(element);
    return domComponentInstance.mountComponent(container);
  }
}

export const React = {
  createElement: (type, props, children) => {
    // #TODO - Children should be array
    /**
     react element will be looked like
     React.createElement('div',{},React.createElement(div,{},'Test'))
    {
      type:'div',
      props: {
        children : {
          type:'div',
          props: {
            children : {

            }
          }
        }
      }
    }
    */
    const element = {
      type: type,
      props: props || {}
    };

    if (children) {
      element.props.children = children;
    }

    return element;
  },
  createClass: spec => {
    function Constructor(props) {
      this.props = props;
    }
    Constructor.prototype.render = spec.render;
    return Constructor;
  },
  render: (element, container) => {
    // converting every component into the class
    // const wrapperElement = React.createElement(TopLevelWrapper, element);

    // As our element is not a fully functional component
    // need to pass to the bridge
    // ReactDOMComponent - mountComponent
    const componentInstance = new FeactCompositeComponentWrapper(element);
    return componentInstance.mountComponent(container);
  }
};
