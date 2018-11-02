import '../assets/styles/footer.styl'

export default {
    data() {
        return {
            author: 'smallBear'
        }
    },
    render() {
        return (
            <div id="foot">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}