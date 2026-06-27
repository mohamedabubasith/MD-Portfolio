import React from 'react';

/**
 * Corner L-bracket ticks — the module-scale echo of the page HUD corners.
 * Rendered as an explicit 4-span set (not ::before/::after) because the
 * diagonal sweep already owns ::before on interactive cards.
 */
const CardTicks: React.FC = () => (
  <div className="card-ticks" aria-hidden="true">
    <span /><span /><span /><span />
  </div>
);

export default CardTicks;
