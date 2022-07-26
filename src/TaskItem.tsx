import styled from "styled-components";
import { FC, memo, useState } from "react";
import { db } from "./firebase"
import { Button } from "@material-ui/core";

type Props = {
  id: string;
  title: string;
}

const STaskItem = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`

const STitle = styled.p`
  font-size: 1rem;
  margin-right: 1rem;
`

const SInput = styled.input`
  font-size: 1rem;
  margin-right: 1rem;
  padding: 0;
`


export const TaskItem: FC<Props> = memo((props) => {
  const [title, setTitle ] = useState(props.title);
  
  const onChengeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onClickUpdate = () => {
    db.collection("todos").doc(props.id).set({
      title
    },{
      merge: true
    });
  }

  const onClickDelete = () => {
    db.collection("todos").doc(props.id).delete();
  }

  return(
    <STaskItem>
      <STitle>{ props.title }</STitle>
      <SInput type="text" value={title} onChange={onChengeTitle}/>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={ onClickUpdate }
      >更新</Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={ onClickDelete }
      > 削除</Button>
    </STaskItem>
  );
})