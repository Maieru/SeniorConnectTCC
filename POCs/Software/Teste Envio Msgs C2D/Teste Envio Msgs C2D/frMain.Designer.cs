namespace Teste_Envio_Msgs_C2D
{
    partial class frMain
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            btnLigarLED = new Button();
            btnDesligarLED = new Button();
            SuspendLayout();
            // 
            // btnLigarLED
            // 
            btnLigarLED.BackColor = SystemColors.ButtonHighlight;
            btnLigarLED.Font = new Font("Segoe UI", 29F);
            btnLigarLED.Location = new Point(12, 12);
            btnLigarLED.Name = "btnLigarLED";
            btnLigarLED.Size = new Size(812, 137);
            btnLigarLED.TabIndex = 0;
            btnLigarLED.Text = "Ligar LED";
            btnLigarLED.UseVisualStyleBackColor = false;
            btnLigarLED.Click += btnLigarLED_Click;
            // 
            // btnDesligarLED
            // 
            btnDesligarLED.BackColor = SystemColors.ButtonHighlight;
            btnDesligarLED.Font = new Font("Segoe UI", 29F);
            btnDesligarLED.Location = new Point(12, 155);
            btnDesligarLED.Name = "btnDesligarLED";
            btnDesligarLED.Size = new Size(812, 137);
            btnDesligarLED.TabIndex = 1;
            btnDesligarLED.Text = "Desligar LED";
            btnDesligarLED.UseVisualStyleBackColor = false;
            btnDesligarLED.Click += btnDesligarLED_Click;
            // 
            // frMain
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.Control;
            ClientSize = new Size(836, 310);
            Controls.Add(btnDesligarLED);
            Controls.Add(btnLigarLED);
            Name = "frMain";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Main";
            ResumeLayout(false);
        }

        #endregion

        private Button btnLigarLED;
        private Button btnDesligarLED;
    }
}
