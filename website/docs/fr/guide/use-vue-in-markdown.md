# Utiliser Vue dans Markdown

Tirez parti de la puissance de Vue et du JavaScript pour rédiger un document Markdown !

## Interpolation

Chaque fichier markdown est d'abord compilé en HTML, puis rendu sous la forme d'un composant Vue. Cela signifie que vous pouvez utiliser une interpolation de Vue dans le texte :

__En entrée__ :

```markdown
{{ 1 + 1 }}
```

__En sortie__ :

```
2
```

## Échappement

Si vous souhaitez désactiver l’interpolation de Vue dans le texte, vous pouvez l’envelopper à l’intérieur d'un bloc de code ou du code intégré comme suit :

__En entrée__ :

````markdown
```js
const foo = `{{ sécurisé, cela ne sera pas interpolé ! }}`
```

Et `{{ bar }}` est aussi sécurisé !
````

__En sortie__ :

```js
const foo = `{{ sécurisé, cela ne sera pas interpolé ! }}`
```

Et `{{ bar }}` est aussi sécurisé !

## Utilisation des composants

Docute a exposé le constructeur `Vue` sur l'objet `window`. Vous pouvez donc l'utiliser pour enregistrer des composants globaux à utiliser dans votre document Markdown :

```js {highlight:['6-13']}
Vue.component('ReverseText', {
  props: ['text'],
  template: `
    <div class="reverse-text">
      {{ reversedText }}
      <v-style>
      .reverse-text {
        border: 1px solid var(--border-color);
        padding: 20px;
        font-weight: bold;
        border-radius: 4px;
      }
      </v-style>
    </div>
  `,
  computed: {
    reversedText() {
      return this.text.split('').reverse().join('')
    }
  }
})
```

Vous remarquerez peut-être la partie mise en évidence, puisque vous ne pouvez pas utiliser directement les balises `style` dans le template Vue, nous avons fourni ici le composant `v-style` pour résoudre ce problème. De même, il y a aussi le composant `v-script`.

__En entrée__ :

```markdown
<ReverseText text="hello world" />
```

__En sortie__ :

<ReverseText text="hello world" />

