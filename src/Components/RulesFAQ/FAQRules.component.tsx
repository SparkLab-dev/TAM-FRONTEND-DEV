import React from 'react';
import CollapsibleTable from './FAQ.component';
import Rules from './Rules.component';

const RulesFAQ: React.FC = () => {
 
  return (
 
    <div style={{height:"100vh",width:"80%",maxWidth:"1300px"}}>
        <h1>Rules And FAQ</h1>
<Rules/>
<CollapsibleTable/>
</div>

  );
};

export default RulesFAQ;
