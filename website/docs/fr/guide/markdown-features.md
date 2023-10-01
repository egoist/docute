# Fonctionnalités de Markdown

Un document doit être facile à lire et à écrire.

## Format du document

Un document est représenté au format Markdown :

```markdown
# Titre

Le contenu va ici ...
```

En interne, nous utilisons l'ultra rapide [marked](https://marked.js.org) pour analyser le Markdown. Ainsi, presque toutes les fonctionnalités de [GitHub Flavored Markdown](https://github.github.com/gfm/) sont prises en charge. .

Consultez l’introduction de [Markdown](https://daringfireball.net/projects/markdown/) si vous n’êtes pas certain du sujet.

## Liens

### Liens internes

Les liens internes sont convertis en `<router-link>` pour une navigation de style SPA.

__En entrée__ :

```markdown
- [Accueil](/) <!-- Envoi l'utilisateur à la page d'accueil -->
- [Utiliser Vue dans Markdown](/guide/use-vue-in-markdown) <!-- Envoi l'utilisateur vers une autre page -->
- [Consulter l'option `title`](../options.md#title) <!-- De même vers un lien relatif à un titre markdown -->
```

__En sortie__ :

- [Accueil](/) <!-- Envoi l'utilisateur à la page d'accueil -->
- [Utiliser Vue dans Markdown](/guide/use-vue-in-markdown) <!-- Envoi l'utilisateur vers une autre page -->
- [Consulter l'option `title`](../options.md#title) <!-- De même vers un lien relatif à un titre markdown -->


### Liens externes

Les liens externes obtiennent automatiquement les attributs HTML `target="_blank" rel="noopener noreferrer"`, par exemple :

__En entrée__ :

```markdown
- [Site web de Docute](https://docute.org)
- [Dépôt de Docute](https://github.com/egoist/docute)
```

__En sortie__ :

- [Site web de Docute](https://docute.org)
- [Dépôt de Docute](https://github.com/egoist/docute)

## Liste de tâches

__En entrée__ :

```markdown
- [ ] Gouverner le web
- [x] Conquérir le monde
- [ ] Apprendre Docute
```

__En sortie__ :

- [ ] Gouverner le web
- [x] Conquérir le monde
- [ ] Apprendre Docute

## Mise en évidence du code

Les blocs de code seront mises en évidence avec [Prism.js](https://prismjs.com/), exemple de code :

```js
// Retourne une fonction qui, tant qu'elle continue à être invoquée, ne sera pas
// déclenchée. La fonction sera appelée après avoir cessé d'être appeler
// N millisecondes. Si `immediate` est passé, cela déclenche immédiatement la fonction
// au lieu d'attendre la fin.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
```

Les langages par défaut que nous prenons en charge :

<ul>
  <li v-for="lang in builtinLanguages" :key="lang">
    {{ lang }}
  </li>
</ul>

Vous pouvez utiliser l'option [highlight](/options#highlight) pour ajouter d'autres langages.

## Options des blocs de code

Selon le langage du bloc de code, vous pouvez utiliser un objet JS pour spécifier des options :

````markdown
```js {highlightLines: [2]}
function foo() {
  console.log('foo')
}
```
````

Options disponibles :

- `highlightLines`: [Mise en évidence de ligne dans les blocs de code](#line-highlighting-in-code-fences)
- `mixin`: [Ajout de Mixin de Vue](#adding-vue-mixin)

## Mise en évidence de ligne dans les blocs de code

__En entrée :__

````markdown
```js {highlight:[3,'5-7',12]}
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```
````

__En sortie :__

```js {highlight:[3,'5-7',12]}
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```

## Ajout de Mixin de Vue

Ajout d'un mixin de Vue au composant Markdown :

````markdown
<button @click="count++">{{ count }}</button> personnes aime Docute.

```js {mixin:true}
{
  data() {
    return {
      count: 1000
    }
  }
}
```
````

<button @click="count++">{{ count }}</button> personnes aime Docute.

```js {mixin:true}
{
  data() {
    return {
      count: 1000
    }
  }
}
```

## Utilisation de Mermaid

[Mermaid](https://mermaidjs.github.io/) est un moyen pour écrire des graphiques en texte brut. Vous pouvez utiliser un simple plugin Docute pour ajouter la prise en charge de Mermaid :

```html
<script src="https://unpkg.com/docute@4/dist/docute.js"></script>
<!-- Charge mermaid -->
<script src="https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js"></script>
<!-- Charge le plugin mermaid -->
<script src="https://unpkg.com/docute-mermaid@1/dist/index.min.js"></script>

<!-- Utilise le plugin -->
<script>
new Docute({
  // ...
  plugins: [
    docuteMermaid()
  ]
})
</script>
```

## Du HTML dans le Markdown

Vous pouvez écrire du HTML dans le Markdown, par exemple :

```markdown
__FAQ__:

<details><summary>Quel est le sens de la vie ?</summary>

certains disent que c'est __42__, d'autres disent que c'est encore inconnu.
</details>
```

__FAQ__:

<details><summary>Quel est le sens de la vie ?</summary>

certains disent que c'est __42__, d'autres disent que c'est encore inconnu.
</details>

<br>

<Note label="Remarque ">En fait, vous pouvez même utiliser les directives de Vue et les composants de Vue dans Markdown, pour en savoir plus [ici](./use-vue-in-markdown.md).</Note>
