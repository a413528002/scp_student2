import React from 'react';
import numeral from 'numeral'

/** 减少使用 dangerouslySetInnerHTML */
const formatting = (val) => `${numeral(val / 10000).format('0,0.00')}`;
export default class Million extends React.Component {
  main = null;

  componentDidMount() {
    this.renderToHtml();
  }

  componentDidUpdate() {
    this.renderToHtml();
  }

  renderToHtml = () => {
    const { children } = this.props;

    if (this.main) {
      this.main.innerHTML = formatting(children);
    }
  };

  render() {
    return (
      <span
        ref={(ref) => {
          this.main = ref;
        }}
      />
    );
  }
}
