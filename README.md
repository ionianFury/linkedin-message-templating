# LinkedIn Message Templating

LinkedIn Message Templating është një browser extension që automatizon një pjesë të dergimit të mesazheve private në LinkedIn.

## Veçoritë

- Message Templating: modelon mesazhin/shabllonin duke ekstraktuar Emrin dhe Mbiemrin e personit të përzgjedhur (static LinkedIn DOM targetting)
- Simple status checks: njofton përdoruesin për statusin e veglës dhe shabllonit

## Instalimi

Për të instaluar këtë browser extension ndiqni këto hapa:

1. Shkarko dhe dekompreso (unzip) browser extension nga [Releases page](https://github.com/ionianFury/linkedin-message-templating/releases).
2. Hap Google Chrome dhe navigo drejt `chrome://extensions/`.
3. Aktivizo "Developer mode" lart në të djathtë.
4. Kliko "Load unpacked" dhe selekto folderin e dekompresuar.

## Përdorimi

Për të përdorur këtë extension:

1. Hap https://www.linkedin.com/search/results/people/ dhe zgjidhni filtrat sipas nevojës
2. Jepe shabllonin e mesazhit tek popup-i poshtë në të majtë
3. Perfor `{{firstName}}` ose `{{lastName}}` në tekst për zëvendësim përkatës dhe kliko "Ruaj shabllonin"
3. Kliko në "Message" butonin e personit për ti shkruar mesazh
4. Vëre se si mesazhi adaptohet automatikisht

![Preview](/images/preview.png "Preview")

## Kontributi

Kontributet janë ato që bëjnë komunitetin open-source një vend të mahnitshëm për të mësuar, frymëzuar dhe krijuar. Çdo kontribut që bëni është **shumë i vlerësuar**.

1. Forko projektin
2. Krijo degën tënde të veçorisë (`git checkout -b feature/AmazingFeature`)
3. Bëj commit ndryshimet e tua (`git commit -m 'Add some AmazingFeature'`)
4. Shtyje në degë (`git push origin feature/AmazingFeature`)
5. Hap një Pull Request

## Licenca

Shpërndarë nën Licencën MIT. Shih `LICENSE` për më shumë informacion.
