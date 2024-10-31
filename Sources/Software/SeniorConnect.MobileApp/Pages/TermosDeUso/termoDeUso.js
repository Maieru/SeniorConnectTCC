import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesTermoDeUso from './stylesTemoDeUso.js';

const TermsOfUse = ({ navigation, route }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { usuario } = route.params;

  const handleAccept = async () => {
    if (isChecked) {
      await AsyncStorage.setItem(`termsAccepted_${usuario}`, 'true');
      console.log(`Termos aceitos para ${usuario}. Redirecionando para Home.`);
      navigation.navigate('Home');
    } else {
      Alert.alert('Atenção', 'Você precisa concordar com os Termos de Uso.');
    }
  };

  return (
    <View style={stylesTermoDeUso.container}>
      <ScrollView style={stylesTermoDeUso.scrollContainer}>
        <Text style={stylesTermoDeUso.title}>Termos de Uso</Text>
        <Text style={stylesTermoDeUso.topicTitle}>1. Aceitação dos termos:</Text>
        <Text style={stylesTermoDeUso.text}>
          Ao utilizar o aplicativo de administração de medicamentos (doravante
          “Senior Connect”), você concorda em cumprir e estar vinculado a estes Termos
          de Uso. Se você não concordar com qualquer parte destes termos, não poderá
          utilizar este aplicativo, pois a utilização dele está condicionada à aceitação e ao
          cumprimento das regras aqui estabelecidas.
        </Text>

        <Text style={stylesTermoDeUso.topicTitle}>2. Descrição do Serviço:</Text>
        <Text style={stylesTermoDeUso.text}>
          Foi projetada uma caixa de remédios inteligente para armazenar os
          medicamentos e um aplicativo de celular que permite gerenciar os horários de
          administração e gerar relatórios de acompanhamento.
        </Text>
        <Text style={stylesTermoDeUso.text}>
          O aplicativo possibilita que os responsáveis configurem os horários,
          recebam alertas e acessem o histórico de doses administradas, garantindo uma
          gestão centralizada e eficiente. Entre as funcionalidades estão alertas de horário,
          notificações push (mensagens enviadas diretamente para o celular do usuário,
          mesmo que o aplicativo não esteja aberto) e confirmações de ingestão de
          medicamentos, tudo com foco em atender as necessidades dos idosos.
        </Text>

        <Text style={stylesTermoDeUso.topicTitle}>3. Uso do aplicativo:</Text>
        <Text style={stylesTermoDeUso.text}>
          3.1. Conta de Usuário: Para acessar as funcionalidades do aplicativo, é
          necessário criar uma conta e fornecer informações precisas e completas. É de
          responsabilidade do usuário manter a confidencialidade, bem como a guarda de
          sua senha e por todas as atividades realizadas com o uso da conta do usuário.
        </Text>
        <Text style={stylesTermoDeUso.text}>
          3.2. Responsabilidade pelo Uso: O usuário concorda em utilizar o
          aplicativo exclusivamente para os fins permitidos por estes Termos de Uso e em
          conformidade com as leis aplicáveis. É estritamente proibido qualquer uso que
          possa causar danos ao aplicativo, sobrecarregar o sistema ou interferir em seu
          funcionamento adequado. Isso inclui, mas não se limita a tentativas de hackear,
          distribuir malware, executar scripts automatizados, acessar indevidamente
          dados de outros usuários ou sobrecarregar os servidores com requisições
          excessivas e demais atividades que possam causar danos ao aplicativo.
        </Text>

        <Text style={stylesTermoDeUso.topicTitle}>4. Privacidade e Proteção dos Dados:</Text>
        <Text style={stylesTermoDeUso.text}>
          4.1. Coleta e Uso de Dados: Para oferecer o serviço, o aplicativo coleta
          dados pessoais sendo: nome completo, e-mail e telefone para associação do
          usuário com o dispositivo e coleta de dados sensíveis uma vez que se refere à
          serviços médicos e afins, pois esse aplicativo coleta dados referente à saúde
          também, e assim, necessita de informações sobre cronograma e listagem de
          remédios que o usuário faz, e esses dados ficarão armazenados no nosso
          dispositivo, para enviar os alertas nos horários prescritos, para que o mesmo
          lembre de ingeri-los e a coleta da abertura das gavetas para construção de um
          relatório de adesão, em que o responsável, pelo usuário, via aplicativo, terá
          acesso a informações de aderência ao cronograma, com base na Lei Geral de
          Proteção de Dados (LGPD). O tratamento desses dados segue as bases legais
          previstas nos Art. 7º, I e II da LGPD, que autorizam o tratamento para a execução
          de contrato e o cumprimento de obrigações legais, esses dados não serão
          utilizados comercialmente e nem servirão para qualquer ato que possa prejudicar
          o usuário.
        </Text>
        <Text style={stylesTermoDeUso.text}>
          4.2. Consentimento e Finalidade: Ao utilizar o aplicativo, o usuário
          consente com a coleta e o processamento de seus dados pessoais de acordo
          com a Lei Geral de Proteção de Dados (LGPD). Os dados serão utilizados para
          os fins descritos neste Termo de Uso, incluindo: (i) gerenciar a administração de
          medicamentos, (ii) enviar alertas e notificações sobre horários de administração,
          (iii) gerar relatórios de aderência e (iv) melhorar as funcionalidades e a
          experiência de uso do aplicativo. Esses dados não serão compartilhados com
          terceiros sem o consentimento expresso do usuário, exceto em casos de
          obrigação legal ou para proteger direitos e interesses legítimos, conforme
          previsto no Art. 5º, I, e Art. 7º da LGPD.
        </Text>
        <Text style={stylesTermoDeUso.text}>
          4.3. Direitos dos Titulares de Dados: É direito do usuário acessar, corrigir,
          excluir ou restringir o uso de seus dados pessoas. Para exercer estes direitos,
          entre em contato conosco através do e-mail faleconosco@seniorconnect.com.
          (Art. 18 da Lei Geral de Proteção de Dados).
        </Text>

        <Text style={stylesTermoDeUso.topicTitle}>5. Propriedade Intelectual:</Text>
        <Text style={stylesTermoDeUso.text}>
          Todo o conteúdo e materiais do aplicativo, incluindo, tais como: design,
          texto, gráficos e software, são de propriedade exclusiva de seus licenciadores e
          são protegidos por direitos autorais e outras leis de propriedade intelectual. É
          proibida a reprodução, distribuição ou modificação não autorizada dos materiais
          do aplicativo.
        </Text>

        <Text style={stylesTermoDeUso.topicTitle}>6. Modificações dos Termos:</Text>
        <Text style={stylesTermoDeUso.text}>
          Podemos atualizar estes Termos de Uso a qualquer momento. As
          alterações serão publicadas no aplicativo e, ao continuar a utilizar o aplicativo
          após a publicação das mudanças, o usuário concordará com os novos termos.
          Em caso de mudanças será solicitado que o usuário aceite os termos atualizados
          antes de continuar a utilizar o serviço.
        </Text>

        <Text style={stylesTermoDeUso.topicTitle}>7. Rescisão:</Text>
        <Text style={stylesTermoDeUso.text}>
          O usuário pode ter sua conta e o acesso ao aplicativo suspensos ou
          encerrados a qualquer momento, com ou sem aviso prévio, caso seja constatada
          a violação destes Termos de Uso ou de qualquer lei aplicável. Sendo o uso
          indevido do aplicativo, como: (i) não respeitar as regras estabelecidas para o uso
          adequado do serviço, (ii) tentar acessar ou manipular informações de outros
          usuários sem autorização, (iii) sobrecarregar o sistema com requisições
          excessivas, ou (iv) comprometer a segurança e a integridade do aplicativo de
          qualquer outra forma.
        </Text>

        <Text style={stylesTermoDeUso.topicTitle}>8. Disposições Gerais:</Text>
        <Text style={stylesTermoDeUso.text}>
          Legislação Aplicável: Este termo será regido e interpretado de acordo com
          as leis do Brasil, entre elas: o Marco Civil da Internet (Lei nº 12.965/2014), que
          regula o uso da internet e a proteção da privacidade dos usuários; a Lei Geral de
          Proteção de Dados (LGPD - Lei nº 13.709/2018), que define as regras para o
          tratamento de dados pessoais; o Código de Defesa do Consumidor (Lei nº
          8.078/1990), que assegura os direitos dos consumidores na prestação de
          serviços digitais; a Lei de Propriedade Industrial (Lei nº 9.279/1996), que protege
          a propriedade industrial, como patentes e marcas; a Lei de Direitos Autorais (Lei
          nº 9.610/1998), que regula os direitos sobre criações intelectuais e a proteção
          de softwares; a Lei de Crimes Informáticos (Lei nº 12.737/2012), que tipifica
          crimes cibernéticos, como a invasão de dispositivos e manipulação indevida de
          sistemas; a Lei do Software (Lei nº 9.609/1998), que regulamenta o
          desenvolvimento e a comercialização de softwares; e a Constituição Federal de
          1988, que protege o direito à privacidade e à intimidade dos cidadãos.
        </Text>

        <Text style={stylesTermoDeUso.text}>Este Termo de Uso foi atualizado pela última vez em: 09/10/2024.</Text>

      </ScrollView>

      <View style={stylesTermoDeUso.checkboxContainer}>
        <Switch value={isChecked} onValueChange={setIsChecked} />
        <Text style={stylesTermoDeUso.checkboxLabel}>Concordo com os Termos de Uso</Text>
      </View>

      <TouchableOpacity style={stylesTermoDeUso.button} onPress={handleAccept}>
        <Text style={stylesTermoDeUso.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TermsOfUse;