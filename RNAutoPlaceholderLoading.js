import React, {Component} from 'react'

export default class RNPlaceholder extends Component {
    constructor(props) {
        super(props);

        this.clonedChilds = React.Children.map(props.children, rootChild => {
            if (!rootChild) return rootChild
            if (rootChild.type && typeof rootChild.type === 'object') {
                return this.recursiveMap(rootChild, rootChild.props.children, this.recursiveMapCallback)
            }
            return this.recursiveMap(rootChild, (new cloned.type(rootChild.props)).render(), this.recursiveMapCallback)
        })
    }

    recursiveMap = (parent, children, fn) => {
        return React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
                return child;
            }

            if (child.props.children) {
                child = React.cloneElement(child, {
                    children: child.type && ['Text'].includes(child.type.displayName) ? '' : this.recursiveMap(child, child.props.children, fn)
                });
            }

            return fn(parent, child);
        });
    }

    recursiveMapCallback = (parent, child) => {
        const displayName = child.type.target ? child.type.target.displayName : child.type.displayName
        let newProps = {
            ...child.props,
            ...{
                style: {
                    ...child.props.style,
                    ...((this.props.defaultStyle && this.props.defaultStyle[displayName]) || {})
                }
            }
        }

        if (displayName === 'Text') {
            newProps = {
                style: {
                    width: newProps.style.width || `${Math.random() * (100 - 20) + 20}%`,
                    backgroundColor: newProps.style.backgroundColor  ||  '#f0f0f0'
                },
                children: null
            }
        } else if (displayName === 'Image') {
            newProps = {
                style: {
                    backgroundColor: newProps.style.backgroundColor  || '#f0f0f0',
                    borderRadius: newProps.style.borderRadius  || 10
                },
                source: null
            }
        }

        return React.cloneElement(child, newProps)
    }

    render() {
        return this.props.loading ? this.clonedChilds : this.props.children;
    };
};
