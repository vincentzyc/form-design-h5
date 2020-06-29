export default {
  functional: true,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  render(h, context) {
    const { item } = context.props;
    return (
      <div class="wg-splitLine wg-padding">
        <hr class="splitLine-hr" style={item.style} />
      </div>
    )
  }
}
