import React from 'react';
import path from "../state/path";
import Icon from "./ui/icon";

class Nav extends React.Component {

    static defaultProps = {
        modules: [],
        activeModule: {},
        onModulesLoaded: () => {},
        onModuleSwitch: () => {}
    };

    switchModule(module) {
        this.props.onModuleSwitch();
        path.forceRefresh = true;
        path.goTo(module.id, 'index');
    }

    render() {
        return (
            <nav className="nav">
                <ul>
                    {this.props.modules.map(module => {

                        if (! module.inNavigation) {
                            return null;
                        }

                        return (
                            <li
                                className={'nav__item'+(this.props.activeModule && this.props.activeModule.id === module.id ? ' nav__item--active' : '')}
                                key={module.id}
                                onClick={e => this.switchModule(module)}
                            >
                                <span className="nav__icon">
                                    <Icon name={module.icon} />
                                </span>
                                <span className="nav__text">
                                    {module.title}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

export default Nav;
