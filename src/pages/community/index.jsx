import React from 'react';
import ReactDOM from 'react-dom';
import Language from '../../components/language';
import Header from '../../components/header';
import Bar from '../../components/bar';
import ContactItem from './contactItem';
import ContributorItem from './contributorItem';
import Footer from '../../components/footer';
import communityConfig from '../../../site_config/community.jsx';

import './index.scss';

class Community extends Language {

  render() {
    const language = this.getLanguage();
    const dataSource = communityConfig[language];
    return (
      <div className="community-page">
        <Header
          currentKey="community"
          type="normal"
          logo="https://img.alicdn.com/tfs/TB1ThlOucfpK1RjSZFOXXa6nFXa-266-72.png"
          language={language}
          onLanguageChange={this.onLanguageChange}
        />
        <Bar img="https://img.alicdn.com/tfs/TB13DcptVzqK1RjSZFCXXbbxVXa-160-160.png" text={dataSource.barText} />
        <section className="contact-section">
          <h3>{dataSource.contacts.title}</h3>
          <p>{dataSource.contacts.desc}</p>
          <div className="contact-list">
          {
            dataSource.contacts.list.map((contact, i) => (
              <ContactItem contact={contact} key={i} />
            ))
          }
          </div>
        </section>
        <section className="contributor-section">
          <h3>{dataSource.contributorGuide.title}</h3>
          <p>{dataSource.contributorGuide.desc}</p>
          <div className="contributor-list">
          {
            dataSource.contributorGuide.list.map((contributor, i) => (
              <ContributorItem contributor={contributor} key={i} />
            ))
          }
          </div>
        </section>
        <Footer logo="https://img.alicdn.com/tfs/TB1H9Eht9zqK1RjSZPxXXc4tVXa-266-72.png" language={language} />
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<Community />, document.getElementById('root'));

export default Community;
