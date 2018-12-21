import React from 'react';
import PropTypes from 'prop-types';
import siteConfig from '../../../site_config/site';
import { getLink } from '../../../utils';
import './index.scss';

const propTypes = {
  logo: PropTypes.string.isRequired, // logo地址
  language: PropTypes.oneOf(['zh-cn', 'en-us']),
};

class Footer extends React.Component {

  render() {
    const { logo, language } = this.props;
    const dataSource = siteConfig[language];
    return (
      <footer className="footer-container">
        <div className="footer-body">
          <img src={getLink(logo)} />
          <div className="cols-container">
            <div className="col col-12">
              <h3>{dataSource.vision.title}</h3>
              <p>{dataSource.vision.content}</p>
            </div>
            <div className="col col-6">
              <dl>
                <dt>{dataSource.documentation.title}</dt>
                {
                  dataSource.documentation.list.map((d, i) => (
                    <dd key={i}><a href={getLink(d.link)} target={d.target || '_self'}>{d.text}</a></dd>
                  ))
                }
              </dl>
            </div>
            <div className="col col-6">
            <dl>
            <dt>{dataSource.resources.title}</dt>
            {
              dataSource.resources.list.map((d, i) => (
                <dd key={i}><a href={getLink(d.link)} target={d.target || '_self'}>{d.text}</a></dd>
              ))
            }
            </dl>
            </div>
          </div>
          <div className="copyright"><span>{dataSource.copyright} | <a href="https://www.cnzz.com/stat/website.php?web_id=1275746144" target="_blank"><img border="0" hspace="0" vspace="0" src="https://icon.cnzz.com/img/pic.gif"/></a></span></div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = propTypes;

export default Footer;
