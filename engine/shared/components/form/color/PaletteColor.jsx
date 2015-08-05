const React     = require('react');
const PureMixin = require('react/lib/ReactComponentWithPureRenderMixin');
const getOppositeColor = require("./oppositeColor");

const PaletteColor = React.createClass({
  mixins: [PureMixin],

  propTypes: {
    "activate": React.PropTypes.func,
    "color": React.PropTypes.string,
    "width": React.PropTypes.number
  },

  render(){
    let {color, width, name, activate} = this.props;

    let style = {
      backgroundColor: color,
      width: `${width}%`
    };

    return (
      <span style={style}
            //onMouseEnter={activate}
            onClick={activate}>
        <span className="palette-label">{name}</span>
      </span>
    );
  }
});

module.exports = PaletteColor;