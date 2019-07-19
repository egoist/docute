# Composants intégrés

Docute est livré avec un ensemble de composants Vue intégrés.

## `<ImageZoom>`

Utilise un effet de zoom de style moyen pour afficher certaines images.

| Prop   | Type      | Par défaut | Description                           |
| ------ | --------- | ---------- | ------------------------------------- |
| src    | `string`  | N/A        | URL vers l'image                      |
| title  | `string`  | N/A        | Titre de l'image                      |
| alt    | `string`  | N/A        | Texte de remplacement                 |
| border | `boolean` | `false`    | Affiche une bordure autour de l'image |
| width  | `string`  | N/A        | Image width                           |

<br>

Exemple :

```markdown
<ImageZoom 
  src="https://i.loli.net/2018/09/24/5ba8e878850e9.png" 
  :border="true" 
  width="300"
/>
```

<ImageZoom src="https://i.loli.net/2018/09/24/5ba8e878850e9.png" :border="true" width="300"/>

## `<Badge>`

Un petit composant d'étiquette.

| Prop     | Type                                                                 | Par défaut | Description                   |
| -------- | -------------------------------------------------------------------- | ---------- | ----------------------------- |
| type     | <code>'tip' &#x7C; 'success' &#x7C; 'warning' &#x7C; 'danger'</code> | N/A        | Type de badge                 |
| color    | `string`                                                             | N/A        | Couleur de fond personnalisée |
| children | `string`                                                             | N/A        | Texte du badge                |

<br>

Exemple :

```markdown
- Fonctionnalité 1 <Badge>Badge</Badge>
- Fonctionnalité 2 <Badge type="tip">Astuce</Badge>
- Fonctionnalité 3 <Badge type="success">Succès</Badge>
- Fonctionnalité 4 <Badge type="warning">Attention</Badge>
- Fonctionnalité 5 <Badge type="danger">Danger</Badge>
- Fonctionnalité 6 <Badge color="magenta">Couleur personnalisée</Badge>
```

- Fonctionnalité 1 <Badge>Badge</Badge>
- Fonctionnalité 2 <Badge type="tip">Astuce</Badge>
- Fonctionnalité 3 <Badge type="success">Succès</Badge>
- Fonctionnalité 4 <Badge type="warning">Attention</Badge>
- Fonctionnalité 5 <Badge type="danger">Danger</Badge>
- Fonctionnalité 6 <Badge color="magenta">Couleur personnalisée</Badge>

## `<Note>`

Blocs notes colorés pour accentuer une partie de votre page.

| Prop     | Type                                                                 | Par défaut          | Description                                       |
| -------- | -------------------------------------------------------------------- | ------------------- | ------------------------------------------------- |
| type     | <code>'tip' &#x7C; 'warning' &#x7C; 'danger' &#x7C; 'success'</code> | N/A                 | Type de note                                      |
| label    | `string` `boolean`                                                   | La valeur de `type` | Custom note label text, use `false` to hide label |
| children | `string`                                                             | N/A                 | Contenu de la note                                |

<br>

Exemples :

```markdown
<Note>

Ceci est une note qui détaille quelque chose d'important.<br>
[Un lien vers des informations utiles.](https://docute.org)

</Note>

<!-- Tip Note -->
<Note type="tip" label="Remarque ">

Ceci est une astuce pour quelque chose de possible.

</Note>

<!-- Warning Note -->
<Note type="warning" label="Attention ">

Ceci est un avertissement pour quelque chose de très important.

</Note>

<!-- Danger Note -->
<Note type="danger" label="Danger ">

C’est un danger pour lequel il faut agir.

</Note>
```

<Note>

Ceci est une note qui détaille quelque chose d'important.<br>
[Un lien vers des informations utiles.](https://docute.org)

</Note>

<!-- Tip Note -->
<Note type="tip" label="Remarque ">

Ceci est une astuce pour quelque chose de possible.

</Note>

<!-- Warning Note -->
<Note type="warning" label="Attention ">

Ceci est un avertissement pour quelque chose de très important.

</Note>

<!-- Danger Note -->
<Note type="danger" label="Danger ">

C’est un danger pour lequel il faut agir.

</Note>

## `<Gist>`

Intègre un [Gist de GitHub](https://gist.github.com/) dans vos documents Markdown.

| Prop | Type     | Default | Description |
| ---- | -------- | ------- | ----------- |
| id   | `string` | N/A     | ID du Gist  |

Exemple :

```markdown
<Gist id="71b8002ecd62a68fa7d7ee52011b2c7c" />
```

<Gist id="71b8002ecd62a68fa7d7ee52011b2c7c" />

## `<docute-select>`

Un composant `<select>` personnalisé :

<!-- prettier-ignore -->
````vue
<docute-select :value="favoriteFruit" @change="handleChange">
  <option value="pomme" :selected="favoriteFruit === 'pomme'">Pomme</option>
  <option value="banane" :selected="favoriteFruit === 'banane'">Banane</option>
  <option value="pastèque" :selected="favoriteFruit === 'pastèque'">Pastèque</option>
</docute-select>

Ton fruit préféré : {{ favoriteFruit }}

```js {mixin: true}
module.exports = { 
  data() { 
    return { 
      favoriteFruit: 'banane' 
    }
  }, 
  methods: {
    handleChange(value) { 
      this.favoriteFruit = value
    } 
  }
}
```
````

<docute-select @change="handleChange" :value="favoriteFruit">
  <option value="pomme" :selected="favoriteFruit === 'pomme'">Pomme</option>
  <option value="banane" :selected="favoriteFruit === 'banane'">Banane</option>
  <option value="pastèque" :selected="favoriteFruit === 'pastèque'">Pastèque</option>
</docute-select>

Ton fruit préféré : {{ favoriteFruit }}

```js {mixin: true}
{
  data() {
    return {
      favoriteFruit: 'banane'
    }
  },
  methods: {
    handleChange(value) {
      this.favoriteFruit = value
    }
  }
}
```

## `<v-style>` `<v-script>`

Un hack pour utiliser les balises `<style>` et `<script>` avec le template Vue.

En général, vous n'avez pas besoin de les utiliser directement, car nous convertissons automatiquement les balises `<style>` et `<script>` du Markdown en ces composants.
