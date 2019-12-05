import React, {Component} from 'react'

export default class RNPlaceholder extends Component {
    constructor(props) {
        super(props);

        this.clonedChilds = React.Children.map(props.children, rootChild => {
            if (!rootChild) return rootChild
            return this.recursiveMap(this, rootChild)
        })
    }

    recursiveMap = (parent, child) => {
        if (!React.isValidElement(child)) {
            return child;
        }
        let renderedChild = typeof child.type === 'function' ? (new child.type(child.props)).render() : child
        const getChildren = (_child) => {
            if (Array.isArray(_child.props.children)) {
                return _child.props.children
            } else if (typeof _child.props.children === 'object') {
                return [_child.props.children]
            }
        }

        const children = getChildren(renderedChild);
        if (children) {
            renderedChild = React.cloneElement(renderedChild, {
                children: children.map(_child => this.recursiveMap(renderedChild, _child))
            });
        }
        return this.elementPaser(parent, renderedChild);
    }

    elementPaser = (parent, child) => {
        const renderedChild = typeof child.type === 'function' ? (new child.type(child.props)).render() : child
        const getName = (_child) => {
            if (typeof _child.type === 'string') {
                return _child.type
            } else if (_child.type && _child.type.displayName) {
                return _child.type.displayName
            }
        }

        const displayName = getName(renderedChild)
        if (!displayName) return renderedChild

        let newProps = {
            ...renderedChild.props,
            ...{
                key: renderedChild.props.key || `${Math.random()}`,
                style: {
                    ...renderedChild.props.style,
                    ...this.props.defaultStyle ? this.props.defaultStyle[displayName] : {}
                }
            },
        }
        console.log(displayName, newProps)
        if (displayName === 'Text') {
            newProps.children = ' ';
            newProps.style.width = newProps.style.width || `${Math.random() * (100 - 50) + 30}%`;
            newProps.style.backgroundColor = newProps.style.backgroundColor  ||  '#f0f0f0';
        } else if (displayName === 'Image') {
            newProps.source = null;
            newProps.style.borderRadius = newProps.style.borderRadius  || 10;
            newProps.style.backgroundColor = newProps.style.backgroundColor  ||  '#f0f0f0';
        }

        return React.cloneElement(renderedChild, newProps);
    }

    render() {
        return this.props.loading ? this.clonedChilds : this.props.children;
    };
};
