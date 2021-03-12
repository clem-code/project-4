import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default function Home() {

  return <div>
    <Button animated>
      <Button.Content visible>Next</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
</div>

}