import React from 'react';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Text, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import PageTitle from 'ui/components/data-display/PageTitle';
import TextInput from 'ui/components/inputs/TextInput';
import Button from 'ui/components/inputs/Button';
import UserInformation from 'ui/components/data-display/UserInformation';

import useIndex from 'data/hooks/pages/useIndex.page';

import {
  FormContainer,
  TextContainer,
  ErrorText,
  ResponseContainer,
} from '@styles/pages/encontrar-diarista';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import useEncontrarDiarista from 'data/hooks/pages/useEncontrarDiarista.page.mobile';
import { useEffect } from 'react';

const EncontrarDiaristas: React.FC = () => {
  const { colors } = useTheme();
  const {
    cep,
    setCep,
    cepValido,
    buscarProfissionais,
    erro,
    diaristas,
    buscaFeita,
    carregando,
    diaristasRestantes,
  } = useIndex(),
  { cepAutomatico } = useEncontrarDiarista();
  const checkBusca = buscaFeita && diaristas.length > 0;

  useEffect(() => {
    if(cepAutomatico && !cep) {
      setCep(cepAutomatico);
      buscarProfissionais(cepAutomatico);
    }
  }, [cepAutomatico]);

  return (
    <ScrollView>
      <PageTitle
        title={'Conheça os profissonais'}
        subtitle={
          'Preencha o seu endereço e veja todos os profissionais da sua área'
        }
      />

      <FormContainer>
        <TextInputMask
          value={cep}
          type={'custom'}
          onChangeText={setCep}
          options={{
            mask: '99.999-999',
          }}
          customTextInput={TextInput}
          customTextInputProps={{
            label: 'Digite seu CEP',
          }}
        />

        {erro ? <ErrorText>{erro}</ErrorText> : null}

        <Button
          color={colors.accent}
          mode={'contained'}
          style={{ marginTop: 32 }}
          disabled={!cepValido || carregando}
          onPress={() => buscarProfissionais(cep)}
          loading={carregando}
        >
          Buscar
        </Button>
      </FormContainer>

      {checkBusca ? (
        <ResponseContainer>
          {diaristas.map((item, index) => (
            <UserInformation
              key={index}
              name={item.nome_completo}
              rating={item.reputacao || 0}
              picture={item.foto_usuario || ''}
              description={item.cidade}
              darker={index % 2 === 1}
            />
          ))}

          {diaristasRestantes > 0 && (
            <TextContainer>
              ...e mais {diaristasRestantes}{' '}
              {diaristasRestantes > 1
                ? 'profissionais atendem'
                : 'prossional atende'}{' '}
              ao seu endereço
            </TextContainer>
          )}

          <Button color={colors.accent} mode={'contained'}>
            Contratar um profissional
          </Button>
        </ResponseContainer>
      ) : (
        <TextContainer>
          Ainda não temos nenhuma diarista disponível em sua região
        </TextContainer>
      )}
    </ScrollView>
  );
};

export default EncontrarDiaristas;
