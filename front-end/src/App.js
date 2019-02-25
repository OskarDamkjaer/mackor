import React, {useState, useEffect} from 'react';
import {
  NumberDiv,
  NumberListContainer,
  AppContainer,
  AdminForm,
  FocusInput,
  ColoredButton,
} from './styles';
import {eat, list} from './api';

export default () => {
  const [tickets, setTickets] = useState([]);
  const [input, setInput] = useState('');
  const [isAdmin, setAdmin] = useState(false);

  const getList = async setter => {
    const tickets = await list();
    setTickets(tickets);
  };

  const filteredTickets = () =>
    tickets
      .filter(
        item => item.stilid.startsWith(input) || item.name.startsWith(input),
      )
      .filter(item => item.count > 0);

  const onType = event => {
    const text = event.target.value;
    if (text === 'hackerman') {
      setAdmin(true);
      setInput('');
    } else {
      setInput(text);
    }
  };

  const remove = async stilid => {
    if (isAdmin) {
      const resp = await eat(stilid);
      setTickets(resp.tickets);
    }
  };

  const onFormSubmit = async event => {
    event.preventDefault();
    const matches = filteredTickets();
    if (matches.length > 0) {
      setInput('');
      remove(matches[0].stilid);
    } else {
      alert('no tickets in list');
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <AppContainer>
      <AdminForm onSubmit={onFormSubmit}>
        <FocusInput value={input} onChange={onType} autoFocus />
        <ColoredButton color="#8ed081" area="send" type="submit">
          spendera
        </ColoredButton>
      </AdminForm>
      <NumberListContainer>
        {filteredTickets().map(ticket => (
          <NumberDiv onClick={() => remove(ticket.stilid)}>{`${ticket.name} - ${
            ticket.stilid
          }, biljetter kvar: ${ticket.count}`}</NumberDiv>
        ))}
      </NumberListContainer>
    </AppContainer>
  );
};
